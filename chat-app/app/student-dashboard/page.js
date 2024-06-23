'use client'

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import ExpertList from "../components/ExpertList"
import ChatRoom from "../components/ChatRoom"

export default function StudentDashboard() {
  const { data: session } = useSession()
  const [selectedExpert, setSelectedExpert] = useState(null)
  const [experts, setExperts] = useState([])

  useEffect(() => {
    fetch('/api/experts')
      .then(res => res.json())
      .then(data => setExperts(data))
  }, [])

  if (!session || session.user.role !== 'student') {
    return <p>Access denied. Please login as a student.</p>
  }

  return (
    <div>
      <h1>Student Dashboard</h1>
      {!selectedExpert ? (
        <ExpertList experts={experts} onSelect={setSelectedExpert} />
      ) : (
        <ChatRoom student={session.user} expert={selectedExpert} />
      )}
    </div>
  )
}