const socketClient = io();
//----------
const formAdd = document.getElementById('form-add');
const formDelete = document.getElementById('form-delete');
//----------
const title = document.getElementById('title');
const description = document.getElementById('description');
const code = document.getElementById('code');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const category = document.getElementById('category');
const number = document.getElementById('number');
//----------

formAdd.onsubmit =  (e) => {
    e.preventDefault();
    const product = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        category: category.value,
    }
    socketClient.emit('product', product);
};

formDelete.onsubmit =  (e) => {
    e.preventDefault();
    let id;
    id = number.value;
    socketClient.emit('id', id);
};