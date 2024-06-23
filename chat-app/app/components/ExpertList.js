'use client'

import React from 'react'

export default function ExpertList({ experts, onSelect }) {
  return (
    <div>
      <h2>Available Experts</h2>
      <ul>
        {experts.map((expert) => (
          <li key={expert.id}>
            {expert.name} - {expert.specialization}
            <button onClick={() => onSelect(expert)}>Chat with this expert</button>
          </li>
        ))}
      </ul>
    </div>
  )
}