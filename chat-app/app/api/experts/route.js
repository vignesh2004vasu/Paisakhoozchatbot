import { NextResponse } from 'next/server'
import { connectToDatabase } from "../../../lib/mongodb"
import User from "../../../models/User"

export async function GET() {
  await connectToDatabase()
  
  try {
    const experts = await User.find({ role: 'expert' }).select('_id username email specialization')
    
    return NextResponse.json(experts.map(expert => ({
      id: expert._id,
      name: expert.username,
      email: expert.email,
      specialization: expert.specialization
    })))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experts' }, { status: 500 })
  }
}