const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const port = Number(process.env.PORT || 3001);

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:3001').split(',').map((origin) => origin.trim()).filter(Boolean);

const normalizeUsername = (value) => String(value ?? '').trim().replace(/\s+/g, ' ').slice(0, 20);
const createSystemMessage = (content) => ({
  id: Math.random().toString(36).slice(2, 9),
  username: 'System',
  content,
  timestamp: new Date().toISOString(),
  type: 'system'
});

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin non autorisée'));
    },
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const users = new Map();

const broadcastUsers = () => {
  io.emit('users-list', { users: [...users.values()] });
};

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', ({ username }) => {
    const cleanUsername = normalizeUsername(username);

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

    io.emit('user-joined', {
      user,
      message: createSystemMessage(`${cleanUsername} a rejoint le salon`)
    });

    broadcastUsers();
    socket.emit('joined', { user });
  });

  socket.on('message', ({ username, content }) => {
    const currentUser = users.get(socket.id);
    const safeContent = String(content ?? '').trim();

    if (!currentUser || currentUser.username !== normalizeUsername(username)) {
      socket.emit('error', { message: 'Utilisateur non autorisé.' });
      return;
    }

    if (!safeContent) {
      socket.emit('error', { message: 'Le message est vide.' });
      return;
    }

    io.emit('message', {
      id: Math.random().toString(36).slice(2, 9),
      username: currentUser.username,
      content: safeContent,
      timestamp: new Date().toISOString(),
      type: 'user'
    });
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);

    if (!user) {
      console.log('User disconnected:', socket.id);
      return;
    }

    users.delete(socket.id);

    io.emit('user-left', {
      user,
      message: createSystemMessage(`${user.username} a quitté le salon`)
    });

    broadcastUsers();
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', usersOnline: users.size });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down...');
  server.close(() => process.exit(0));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  server.close(() => process.exit(0));
});
