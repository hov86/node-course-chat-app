const socket = io();
const messageForm = document.querySelector('#message-form');
const inputField = document.querySelector('#input-field');
const submitButton = document.querySelector('#submit');
const messages = document.querySelector('#messages');

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newEmail', function (email) {
    console.log('New email', email);
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
    let li = document.createElement('UL');
    let text = document.createTextNode(`${message.from}: ${message.text}`);
    messages.appendChild(text);
    messages.appendChild(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function(data) {
//     console.log('Got the data.', data);
// });

messageForm.addEventListener('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: inputField.value
    }, function () {

    });
});

submitButton.addEventListener('submit', () => {
    messareForm.reset();
});