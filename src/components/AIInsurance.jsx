import styles from "./Forms.module.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSync } from "@fortawesome/free-solid-svg-icons";

function AIInterview() {
  // State variables
  const [conversation, setConversation] = useState([]); // Stores the conversation history
  const [userResponse, setUserResponse] = useState(""); // Stores the user's response input
  const [submitToFeedback, setSubmitToFeedback] = useState(false); // Tracks whether feedback should be submitted
  const [loading, setLoading] = useState(false); // Tracks the loading state
  const chatRef = useRef(null); // Reference to the chat container for auto-scrolling

  // Handles reply submission
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
    };

    const endpoint = `${
      import.meta.env.VITE_REACT_APP_BACKEND_URL
    }/api/insurance-connection`;

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
      <div className={styles.title}>
        Tinnie - your AI insurance policy assistant
      </div>

      {/* Message Form */}
      <form className={styles.messageForm} onSubmit={handleReplySubmit}>
        <div className={styles.chat} ref={chatRef}>
          {" "}
          {/* Add ref to chat container */}
          {conversation.map((entry, index) => (
            <p
              key={index}
              className={
                entry.from === "user" ? styles.userMessage : styles.modelMessage
              }
            >
              {entry.from === "user" ? (
                entry.text
              ) : (
                <>
                  <strong>AI:</strong> {entry.text}
                </>
              )}
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
          />
          <button type="submit" className={styles.replyButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AIInterview;
