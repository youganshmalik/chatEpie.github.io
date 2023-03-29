const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('notification.mp3');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == 'left') {
    audio.play();
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInp.value;
  append(`<strong>You:</strong> ${message}`, 'right');
  socket.emit('send', message);
  messageInp.value = '';
});

let name = prompt('Enter name to get your E-π');
if (name) {
  socket.emit('new-user-joined', name);
} else {
  name = 'Anonymous';
}

socket.on('user-joined', (name) => {
  append(`<strong>${name} joined the chat</strong>`, 'right');
});

socket.on('receive', (data) => {
  append(`<strong>${data.name}:</strong> ${data.message}`, 'left');
});

socket.on('left', (name) => {
  append(`<strong>${name} left the chat</strong>`, 'left');
});

document.addEventListener('DOMContentLoaded', function (event) {
  var h1 = document.querySelector('h1');
  h1.classList.add('pop');
});
