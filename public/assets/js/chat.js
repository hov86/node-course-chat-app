const socket = io();
const messageForm = document.querySelector('#message-form');
const inputField = document.querySelector('#input-field');
const submitButton = document.querySelector('#submit');
const messages = document.querySelector('#messages');
const sendLocation = document.querySelector('#send-location');

async function scrollToBottom() {
    // Selectors
    const messages = document.querySelector('#messages');
    let newMessage = messages.lastElementChild;

    // Heights
    let clientHeight = messages.clientHeight;
    let scrollTop = messages.scrollTop;
    let scrollHeight = messages.scrollHeight;
    let newMessageHeight = newMessage.clientHeight;
    let lastMessageHeight = await newMessage.previousElementSibling.clientHeight;

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        newMessage.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }

    console.log('Should Scroll');
}

socket.on('connect', function () {
    let params = deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if(err) {
            alert(err);
            window.location.href = '/'
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// Update User List
socket.on('updateUserList', function (users) {
    console.log('Users list', users);
    const userList = document.querySelector('#user__list');
    const ol = document.createElement('ol');

    users.forEach(function (user) {
        const li = document.createElement('li');
        li.innerText = user;
        ol.appendChild(li);
    });
    userList.innerHTML = ol.innerHTML;
});

// New Message
socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = document.querySelector('#message-template').innerHTML;
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    messages.insertAdjacentHTML('beforeend', html);
    scrollToBottom();
});

// New Location Message
socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = document.querySelector('#location-message-template').innerHTML;
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    messages.insertAdjacentHTML('beforeend', html);
    scrollToBottom();
});

messageForm.addEventListener('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        text: inputField.value
    }, function () {
        messageForm.reset();
    });
});

sendLocation.addEventListener('click', (e) => {
    e.preventDefault();
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