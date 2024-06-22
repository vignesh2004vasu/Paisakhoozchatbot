// utils/formatMessage.js
const formatMessage = (sender, content) => {
    return {
      sender,
      content,
      timestamp: new Date().toISOString(),
    };
  };
  
  export default formatMessage;
  