'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import Login from './components/Login'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
        {session.user.role === 'student' ? (
          <Link href="/student-dashboard">Go to Student Dashboard</Link>
        ) : (
          <Link href="/expert-dashboard">Go to Expert Dashboard</Link>
        )}
      </div>
    )
  }
  return <Login />
}