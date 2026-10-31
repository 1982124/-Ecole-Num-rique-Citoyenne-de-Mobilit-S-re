const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const port = Number(process.env.PORT || 3001);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const users = new Map();

const createSystemMessage = (content) => ({
  id: Math.random().toString(36).slice(2, 9),
  username: 'System',
  content,
  timestamp: new Date().toISOString(),
  type: 'system'
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', ({ username }) => {
    const cleanUsername = String(username || '').trim();

    if (!cleanUsername || cleanUsername.length < 2) {
      socket.emit('error', { message: 'Le nom d’utilisateur est invalide.' });
      return;
    }

    const alreadyExists = [...users.values()].some(
      (user) => user.username.toLowerCase() === cleanUsername.toLowerCase()
    );

    if (alreadyExists) {
      socket.emit('error', { message: 'Ce pseudo est déjà pris.' });
      return;
    }

    const user = { id: socket.id, username: cleanUsername };
    users.set(socket.id, user);

    socket.emit('users-list', { users: [...users.values()] });
    io.emit('user-joined', {
      user,
      message: createSystemMessage(`${cleanUsername} a rejoint le salon`)
    });
  });

  socket.on('message', ({ username, content }) => {
    const currentUser = users.get(socket.id);

    if (!currentUser || currentUser.username !== username) {
      socket.emit('error', { message: 'Utilisateur non autorisé.' });
      return;
    }

    io.emit('message', {
      id: Math.random().toString(36).slice(2, 9),
      username,
      content,
      timestamp: new Date().toISOString(),
      type: 'user'
    });
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);

    if (!user) return;

    users.delete(socket.id);
    io.emit('user-left', {
      user,
      message: createSystemMessage(`${user.username} a quitté le salon`)
    });
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
