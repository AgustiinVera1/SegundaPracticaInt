import express from "express";
import { engine } from 'express-handlebars';
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { manager1 } from "./dao/fileSystem/ProductManager.js";
//routes
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
//DB
import './config/configDB.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
/*
app.engine('handlebars', engine({
	defaultLayout:'main',
	runtimeOptions:{
		allowProtoPropertiesByDefault: true,
		allowProtoMethodsByDefault: true
	}
}));
*/

//routes
app.use('/api/views', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const httpServer = app.listen(3000, () => {
	console.log('Puerto 3000');
});

const socketServer = new Server(httpServer);
const messages = [];

socketServer.on('connection', (socket) => {
	console.log('cliente conectado');
	socket.on('product', async (product) => {
		await manager1.addProduct(product);
	})

	socket.on('id', async (id) => {
		await manager1.deleteProduct(+id);
	})

	//chat 
	socket.on('newUser', (user) => {
		socket.broadcast.emit('userConnected', user);
	});

	socket.on('message', (info) => {
		messages.push(info);
		socketServer.emit('chat', messages); //socketServer para que todos lo vean
	});
});