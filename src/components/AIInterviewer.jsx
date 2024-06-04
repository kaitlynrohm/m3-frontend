import styles from "./Forms.module.css";
import React, { useState } from "react";
import axios from "axios";



function InterviewChat() {
  const [jobTitle, setJobTitle] = useState("");
  const [conversation, setConversation] = useState([]);
  const [userResponse, setUserResponse] = useState("");

  const handleJobTitleSubmit = async (e) => {
    e.preventDefault();

    const requestData = { title: jobTitle};

    console.log('Submitting job title:', requestData);

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/gemini-connection`, requestData);
      console.log('Job title submitted successfully:', response.data);

      // Update the conversation with the model's response
      setConversation([
        ...conversation,
        { from: "user", text: "Begin" },
        { from: "interviewer", text: response.data },
      ]);
    } catch (error) {
      console.error('Error submitting job title:', error);
      if (error.response) {
        console.error('Error Response Data:', error.response.data);
        console.error('Error Status:', error.response.status);
        console.error('Error Headers:', error.response.headers);
      } else {
        console.error('Error Request:', error.request);
      }
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    const newConversation = [
      ...conversation,
      { from: "user", text: userResponse },
    ];
    setConversation(newConversation);
    setUserResponse("");

    const conversationHistory = newConversation.map((entry) => ({
      role: entry.from === "user" ? "user" : "model",
      parts: [{ text: entry.text }],
    }));

    const requestData = {
      history: conversationHistory,
      message: userResponse,
      title: jobTitle,
    };

    const userResponsesCount = newConversation.filter(entry => entry.from === 'user').length;
    const endpoint = userResponsesCount === 8
      ? `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/feedback`
      : `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/gemini-connection`;

    console.log('Constructed URL:', endpoint);
    console.log('Request Data:', requestData);

    await axios
      .post(endpoint, requestData)
      .then((response) => {
        console.log(response.data);
        setConversation([
          ...newConversation,
          { from: "interviewer", text: response.data },
        ]);
      });
  };

  return (
    <div className={styles.contentContainer}>
      <h2 className={styles.title}>AI Interviewer</h2>

      <form className={styles.jobTitleForm} onSubmit={handleJobTitleSubmit}>
        <div className={styles.inputContainer}>
          <label>Job Title:</label>
          <input
            placeholder="Submit Job Title to begin..eg, Junior Developer"
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </div>
      </form>

      <form className={styles.messageForm} onSubmit={handleReplySubmit}>
        <div className={styles.chat}>
          {conversation.map((entry, index) => (
            <p
              key={index}
              className={entry.from === "user" ? styles.userMessage : styles.modelMessage}
            >
              {entry.text}
            </p>
          ))}
        </div>

        <div className={styles.inputContainer} id={styles.message}>
          <textarea 
            placeholder="I'm passionate because I.."
            type='text'
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            style={{ overflow: 'hidden' }}
            required
          />
          <button type="submit">Reply</button>
        </div>
      </form>
    </div>
  );
}

export default InterviewChat;
