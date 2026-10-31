import 'dotenv/config'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { users } from './state.js'
import type { JoinPayload, SendMessagePayload, User } from './types.js'
import { createSystemMessage, createUserMessage } from './utils.js'

const httpServer = createServer()
const port = Number(process.env.PORT || 3003)
const socketPath = process.env.SOCKET_PATH || '/socket.io'

const io = new Server(httpServer, {
  path: socketPath,
  cors: {
    origin: process.env.CLIENT_ORIGIN
      ? process.env.CLIENT_ORIGIN.split(',').map((item) => item.trim())
      : true,
    methods: ['GET', 'POST'],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000
})

const isUsernameTaken = (username: string) =>
  [...users.values()].some((user) => user.username.toLowerCase() === username.toLowerCase())

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on('join', ({ username }: JoinPayload) => {
    const cleanUsername = username?.trim()

    if (!cleanUsername || cleanUsername.length < 2) {
      socket.emit('error', { message: 'Le nom d’utilisateur est invalide.' })
      return
    }

    if (isUsernameTaken(cleanUsername)) {
      socket.emit('error', { message: 'Ce nom d’utilisateur est déjà pris.' })
      return
    }

    const user: User = {
      id: socket.id,
      username: cleanUsername
    }

    users.set(socket.id, user)

    const joinMessage = createSystemMessage(`${cleanUsername} a rejoint le salon`)
    io.emit('user-joined', {
      user,
      message: joinMessage
    })

    socket.emit('users-list', {
      users: [...users.values()]
    })

    console.log(`${cleanUsername} joined the chat room`)
  })

  socket.on('message', ({ username, content }: SendMessagePayload) => {
    const currentUser = users.get(socket.id)

    if (!currentUser || currentUser.username !== username) {
      socket.emit('error', { message: 'Utilisateur non autorisé.' })
      return
    }

    const message = createUserMessage(username, content)
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    const currentUser = users.get(socket.id)

    if (!currentUser) {
      console.log(`User disconnected: ${socket.id}`)
      return
    }

    users.delete(socket.id)

    const leaveMessage = createSystemMessage(`${currentUser.username} a quitté le salon`)
    io.emit('user-left', {
      user: currentUser,
      message: leaveMessage
    })

    console.log(`${currentUser.username} left the chat room`)
  })
})

httpServer.listen(port, () => {
  console.log(`WebSocket server running on port ${port}`)
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down...')
  httpServer.close(() => process.exit(0))
})

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...')
  httpServer.close(() => process.exit(0))
})
