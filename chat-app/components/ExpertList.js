import React from 'react';

const ExpertList = ({ experts, onSelect }) => {
  return (
    <div>
      <h2>Available Experts</h2>
      <ul>
        {experts.map((expert, index) => (
          <li key={index}>
            {expert}
            <button onClick={() => onSelect(expert)}>Connect</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpertList;
