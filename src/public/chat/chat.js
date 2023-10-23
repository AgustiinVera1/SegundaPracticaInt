const socketClient = io();
const h4Name = document.getElementById('name');
const form = document.getElementById('chatForm');
const inputMessage = document.getElementById('message');
const divChat = document.getElementById('chat');
let user;
Swal.fire({
    title: 'Welcome!',
    text: 'Whats is your name?',
    input: 'text',
    inputValidator: (value) => {
        if (!value) {
            return 'The name is required';
        }
    },
    confirmButtonText: 'Aceptar'
}).then((input) => {
    user = input.value;
    h4Name.innerText = user;
    socketClient.emit('newUser', user);
});

socketClient.on('userConnected', (user) => {
    Toastify({
        text: `${user} connected`,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        duration: 5000,
    }).showToast();
})

form.onsubmit = (e) => {
    e.preventDefault() // con este evitamos q se resfresque la pagina como lo hacia
    const infoMessage = {
        name: user,
        message: inputMessage.value,
    };
    inputMessage.innerText = "";
    socketClient.emit('message', infoMessage);
}

socketClient.on('chat', (messages) => {
    const chat = messages.map((m) => {
        return `<p>${m.name}: ${m.message}</p>`;
    }).join(" ");
    divChat.innerHTML = chat;
});