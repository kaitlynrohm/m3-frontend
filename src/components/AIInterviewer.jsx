import styles from "./Forms.module.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

function AIInterview() {
  const [jobTitle, setJobTitle] = useState("");
  const [conversation, setConversation] = useState([]);
  const [userResponse, setUserResponse] = useState("");
  const [submitToFeedback, setSubmitToFeedback] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const chatRef = useRef(null); // Add reference to chat container

  const handleJobTitleSubmit = async (e) => {
    e.preventDefault();

    const requestData = { title: jobTitle };

    setLoading(true); // Set loading to true before the API call
    await axios
      .post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/gemini-connection`,
        requestData
      )
      .then((response) => {
        console.log("Job title submitted successfully:", response.data);
        setConversation([
          ...conversation,
          { from: "user", text: `Begin mock interview for ${jobTitle}.` },
          { from: "interviewer", text: response.data },
        ]);
        setLoading(false); // Set loading to false after the API call
      })
      .catch(() => setLoading(false)); // Set loading to false in case of error
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

    const endpoint = submitToFeedback
      ? `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/feedback`
      : `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/gemini-connection`;

    console.log("Constructed URL:", endpoint);
    console.log("Request Data:", requestData);

    setLoading(true); // Set loading to true before the API call
    await axios
      .post(endpoint, requestData)
      .then((response) => {
        console.log(response.data);
        setConversation([
          ...newConversation,
          { from: "interviewer", text: response.data },
        ]);
        setLoading(false); // Set loading to false after the API call
      })
      .catch(() => setLoading(false)); // Set loading to false in case of error
  };

  // Scroll to the bottom of the chat container whenever the conversation updates
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className={styles.contentContainer}>
      <div className={styles.title}>AI Mock Interview</div>

      <form className={styles.jobTitleForm} onSubmit={handleJobTitleSubmit}>
        <div className={styles.inputContainer}>
          <label>Job Title:</label>
          <input
            disabled={conversation.length > 1}
            placeholder="Submit Job Title to Begin..eg, Junior Developer"
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
          <button type="submit" disabled={conversation.length > 1}>Submit</button>
        </div>
      </form>

      <form className={styles.messageForm} onSubmit={handleReplySubmit}>
        <div className={styles.chat} ref={chatRef}> {/* Add ref to chat container */}
          {conversation.map((entry, index) => (
            <p
              key={index}
              className={entry.from === "user" ? styles.userMessage : styles.modelMessage}
            >
              {entry.from === "user" ? entry.text : <><strong>AI:</strong> {entry.text}</>}
            </p>
          ))}
          {loading && (
            <p className={styles.modelMessage}>
              <strong>AI:</strong> is typing
              <span className={styles.loadingDots}>
                <span>.</span>
                <span className={styles.dot1}>.</span>
                <span className={styles.dot2}>.</span>
              </span>
            </p>
          )}
        </div>

        <div className={styles.inputContainer} id={styles.message}>
          <textarea
            placeholder="Type your response here..."
            type="text"
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            style={{ overflow: "hidden" }}
            required={!submitToFeedback}
            disabled={submitToFeedback || conversation.length < 1}
          />
          <button type="submit" className={styles.replyButton} disabled={submitToFeedback || conversation.length < 1} >Reply</button>
          <button
            type="submit"
            className={styles.feedbackButton}
            disabled={conversation.length < 16}
            onClick={() => {
              if (submitToFeedback) {
                window.location.reload();
              } else {
                setSubmitToFeedback(true);
              }
            }}
          >
            <pre>{submitToFeedback ? (<>Restart<br/><FontAwesomeIcon icon={faSync} size="lg" /> </>) : (`End & Get\nFeedback`)}</pre>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AIInterview;
