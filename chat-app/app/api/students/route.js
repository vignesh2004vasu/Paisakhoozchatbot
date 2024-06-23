import { NextResponse } from 'next/server'
import { connectToDatabase } from "../../../lib/mongodb"
import User from "../../../models/User"

export async function GET(request) {
  await connectToDatabase()
  
  const { searchParams } = new URL(request.url)
  const expertId = searchParams.get('expertId')
  
  if (!expertId) {
    return NextResponse.json({ error: 'Expert ID is required' }, { status: 400 })
  }

  try {
    // This is a simplified version. In a real application, you'd need a separate
    // collection to track which students have requested which experts.
    const students = await User.find({ role: 'student' }).select('_id username email topic')
    
    return NextResponse.json(students.map(student => ({
      id: student._id,
      name: student.username,
      email: student.email,
      topic: student.topic
    })))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 })
  }
}