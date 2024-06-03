import styles from "./Forms.module.css";
import React, { useState } from 'react';
import axios from 'axios';

function InterviewChat() {
  const [jobTitle, setJobTitle] = useState('');
  const [conversation, setConversation] = useState([]);
  const [userResponse, setUserResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newConversation = [...conversation, { from: 'user', text: userResponse }];
    setConversation(newConversation);
    setUserResponse('');

    const conversationHistory = newConversation.map(entry => ({
      role: entry.from === 'user' ? 'user' : 'model',
      parts: [{ text: entry.text }]
    }));

    const requestData = {
      history: conversationHistory,
      message: userResponse,
      title: jobTitle
    };

    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/gemini-connection`, requestData);

    setConversation([...newConversation, { from: 'interviewer', text: response.data.text }]);
  };

  return (
    <div className={styles.contentContainer}>
      <h2 className={styles.title}>AI Mock Interviewer</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
            <label>Job Title:</label>
            <input
              placeholder='Junior Developer'
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
        </div>

        <div className={styles.chat}>
          {conversation.map((entry, index) => (
            <p key={index} style={{ textAlign: entry.from === 'user' ? 'right' : 'left' }}>
              {entry.text}
            </p>
          ))}
        </div>

        <div className={styles.inputContainer}>
          <input
            placeholder="I'm passionate because I.."
            type="text"
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default InterviewChat;
