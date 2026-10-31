import type { Message } from './types.js'

export const generateId = () => Math.random().toString(36).slice(2, 11)

export const createSystemMessage = (content: string): Message => ({
  id: generateId(),
  username: 'System',
  content,
  timestamp: new Date(),
  type: 'system'
})

export const createUserMessage = (username: string, content: string): Message => ({
  id: generateId(),
  username,
  content,
  timestamp: new Date(),
  type: 'user'
})
