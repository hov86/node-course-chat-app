const socket = io();
const messageForm = document.querySelector('#message-form');
const inputField = document.querySelector('#input-field');
const submitButton = document.querySelector('#submit');
const messages = document.querySelector('#messages');
const sendLocation = document.querySelector('#send-location');

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    messages.innerHTML +=
    `
    <div class="notification">
        <p><strong>${message.from}</strong> ${formattedTime}: ${message.text}</p>
    </div>
    `
});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    messages.innerHTML +=
    `
    <article class="message is-primary">
        <div class="message-body">
            <p>${message.from} has shared their location!</p>
            <a href="${message.url}" target="_blank"><span class="icon"><i class="fas fa-map-marked-alt"> Check it out! </i></span></a>
            ${formattedTime}
        </div>
    </article>
    `
});

messageForm.addEventListener('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: inputField.value
    }, function () {
        messageForm.reset();
    });
});

sendLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Gelocation not supported by your browser.');
    }
    sendLocation.setAttribute('disabled', true);
    sendLocation.innerHTML = "Sending Location";

    navigator.geolocation.getCurrentPosition(function (position) {
        sendLocation.removeAttribute('disabled');
        sendLocation.innerHTML = `<span class="icons"><i class="fas fa-map-marker-alt"> Share Location</i></span>`;

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        sendLocation.removeAttribute('disabled');
        sendLocation.innerHTML = `<span class="icons"><i class="fas fa-map-marker-alt"> Share Location</i></span>`;
        alert('Unable to fetch location.')
    });

});