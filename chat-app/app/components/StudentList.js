'use client'

import React from 'react'

export default function StudentList({ students, onSelect }) {
  return (
    <div>
      <h2>Students Requesting Help</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.topic}
            <button onClick={() => onSelect(student)}>Chat with this student</button>
          </li>
        ))}
      </ul>
    </div>
  )
}