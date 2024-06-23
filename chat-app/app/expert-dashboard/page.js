'use client'

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import StudentList from "../components/StudentList"
import ChatRoom from "../components/ChatRoom"

export default function ExpertDashboard() {
  const { data: session } = useSession()
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [students, setStudents] = useState([])

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/students?expertId=${session.user.id}`)
        .then(res => res.json())
        .then(data => setStudents(data))
    }
  }, [session])

  if (!session || session.user.role !== 'expert') {
    return <p>Access denied. Please login as an expert.</p>
  }

  return (
    <div>
      <h1>Expert Dashboard</h1>
      {!selectedStudent ? (
        <StudentList students={students} onSelect={setSelectedStudent} />
      ) : (
        <ChatRoom student={selectedStudent} expert={session.user} />
      )}
    </div>
  )
}