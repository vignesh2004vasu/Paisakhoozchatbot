'use client'

import { useState, useEffect } from 'react'
import io from 'socket.io-client'

let socket

export default function ChatRoom({ student, expert }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socketInitializer()
    return () => {
      if (socket) socket.disconnect()
    }
  }, [])

  async function socketInitializer() {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-chat', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg])
    })
  }

  const sendMessage = async () => {
    socket.emit('send-message', {
      message,
      sender: student.id === expert.id ? expert : student,
      receiver: student.id === expert.id ? student : expert,
    })
    setMessage('')
  }

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.sender.name}: {msg.message}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}