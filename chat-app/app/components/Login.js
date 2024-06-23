'use client'

import { useState } from 'react'
import { signIn } from "next-auth/react"

export default function Login() {
  const [showCredentials, setShowCredentials] = useState(false)

  const handleSignInClick = () => {
    setShowCredentials(true)
  }

  return (
    <div>
      <h1>Login</h1>
      {!showCredentials ? (
        <button onClick={handleSignInClick}>Sign in</button>
      ) : (
        <CredentialForm />
      )}
    </div>
  )
}

function CredentialForm() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: ''
  })

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      username: credentials.username,
      password: credentials.password,
      role: credentials.role,
      callbackUrl: '/',
      redirect: false,
    })

    if (result.error) {
      // Handle error (e.g., show error message)
      console.error(result.error)
    } else {
      // Redirect based on role
      window.location.href = credentials.role === 'student' ? '/student-dashboard' : '/expert-dashboard'
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={credentials.role}
          onChange={handleChange}
          required
        >
          <option value="">Select a role</option>
          <option value="student">Student</option>
          <option value="expert">Expert</option>
        </select>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}