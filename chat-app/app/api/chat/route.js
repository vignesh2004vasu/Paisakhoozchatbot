import { NextResponse } from 'next/server'
import { connectToDatabase } from "../../../lib/mongodb"
import Chat from "../../../models/Chat"

export async function POST(request) {
  const { db } = await connectToDatabase()
  const { senderId, receiverId, message } = await request.json()
  
  const chat = new Chat({ senderId, receiverId, message })
  await chat.save()
  
  return NextResponse.json(chat)
}

export async function GET(request) {
  const { db } = await connectToDatabase()
  const { searchParams } = new URL(request.url)
  const senderId = searchParams.get('senderId')
  const receiverId = searchParams.get('receiverId')
  
  const chats = await Chat.find({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId }
    ]
  }).sort({ createdAt: -1 }).limit(10)
  
  return NextResponse.json(chats)
}