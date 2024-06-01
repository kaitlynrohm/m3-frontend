import React, { useState } from 'react';
import axios from 'axios';
import styles from "./Forms.module.css"

const InterviewChat = () => {
    const [job, setJob] = useState('');
    const [reply, setReply] = useState('');
    const [aiResponse, setaiResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/aichat', { job, reply });
            setaiResponse(response.data.ai_response);
        } catch (error) {
            setError(error.response.data.error || 'An error occurred');
        }
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
                      value={job}
                      onChange={(e) => setJob(e.target.value)}
                      required
                    />
                </div>

                <div className={styles.chat}>
                    <p>Interviewer: Tell me about yourself.</p>
                    <p>Me: I'm passionate about software development. I joined Mission Ready earlier this year, and decided to switch from a chef to a full time software developer.</p>
                    <p>Interviewer: What aspect of software development made you passionate about it?</p>
                    <p>Me:</p>
                </div>

                <div className={styles.inputContainer}>
                    <input
                      placeholder="I'm passionate because I.."
                      type="text"
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      required
                    />
                    <button type="submit">Submit</button>
                </div>
                
            </form>
        </div>
    );
};

export default InterviewChat;
