const socket = io();

const joinForm = document.getElementById('join-form');
const messageForm = document.getElementById('message-form');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message-input');
const chat = document.getElementById('chat');
const userList = document.getElementById('user-list');

let currentUser = '';

function renderUsers(users) {
  userList.innerHTML = '';

  users.forEach((user) => {
    const li = document.createElement('li');
    li.textContent = user.username;
    userList.appendChild(li);
  });
}

function appendMessage(message) {
  const div = document.createElement('div');
  div.className = `message ${message.type}`;

  const author = document.createElement('strong');
  author.textContent = message.username;

  const content = document.createElement('div');
  content.textContent = message.content;

  div.appendChild(author);
  div.appendChild(content);
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

joinForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();

  if (!username) {
    alert('Entrez un pseudo pour rejoindre le salon.');
    return;
  }

  currentUser = username;
  socket.emit('join', { username });
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const content = messageInput.value.trim();
  if (!content) return;

  socket.emit('message', {
    username: currentUser,
    content
  });

  messageInput.value = '';
});

socket.on('users-list', ({ users }) => {
  renderUsers(users);
  joinForm.classList.add('hidden');
  messageForm.classList.remove('hidden');
  usernameInput.disabled = true;
});

socket.on('user-joined', ({ message }) => {
  appendMessage(message);
});

socket.on('user-left', ({ message }) => {
  appendMessage(message);
});

socket.on('message', (message) => {
  appendMessage(message);
});

socket.on('error', ({ message }) => {
  alert(message);
});
