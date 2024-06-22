import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ExpertList from '../components/ExpertList';
import ChatRoom from '../components/ChatRoom';

const ChatPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [experts, setExperts] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState(null);

  useEffect(() => {
    // Fetch experts from backend (API call)
    // Example: fetchExperts();
    const dummyExperts = ['Expert 1', 'Expert 2', 'Expert 3'];
    setExperts(dummyExperts);
  }, []);

  const handleExpertSelect = (expert) => {
    setSelectedExpert(expert);
    // Create or join chat room with selected expert
    // Example: createChatRoom(username, expert);
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <ExpertList experts={experts} onSelect={handleExpertSelect} />
      {selectedExpert && <ChatRoom username={username} expert={selectedExpert} />}
    </div>
  );
};

export default ChatPage;
