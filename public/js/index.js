const socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'john',
        text: 'Hey, let\'s meet up at 8.'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newEmail', function (email) {
    console.log('New email', email);
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
});