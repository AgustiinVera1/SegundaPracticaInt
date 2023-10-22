import mongoose from "mongoose";

const URI = 'mongodb+srv://agustiinvera1:Contraseña110900@cluster0.tbbdfwn.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose
.connect(URI)
.then(()=>{console.log('Conectado a base de datos: ecommerce')})
.catch(error=>console.log(error))