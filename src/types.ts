export interface User {
  id: string
  username: string
}

export interface Message {
  id: string
  username: string
  content: string
  timestamp: Date
  type: 'user' | 'system'
}

export interface JoinPayload {
  username: string
}

export interface SendMessagePayload {
  username: string
  content: string
}
