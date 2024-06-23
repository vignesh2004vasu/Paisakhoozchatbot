import { NextResponse } from 'next/server'
import { connectToDatabase } from "../../../lib/mongodb"
import User from "../../../models/User"
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    await connectToDatabase()
    const data = await request.json()

    // Hash the password
    const hashedPassword = bcrypt.hashSync(data.password, 10)

    const newUser = new User({
      username: data.username,
      password: hashedPassword,
      email: data.email,
      role: data.role,
      specialization: data.specialization, // for experts
      topic: data.topic // for students
    })

    await newUser.save()

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}