# AI Chatbot - Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Google Generative AI](https://img.shields.io/badge/Google%20Generative%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)


## Description

This is the frontend application for the AI Chatbot project. It provides an interface for users to interact with the AI interviewer and the insurance policy recommendation chatbot. The frontend communicates with the backend to fetch and display data.

The overall application is designed to simulate mock job interviews using Google Generative AI. It generates interview questions and provides feedback based on user input for a specified job title. This tool is intended to help users practice their interview skills and receive constructive feedback.

In addition to the interviewer functionality, the application also includes a chatbot that interacts with customers, asks relevant questions, and recommends the best insurance policy type based on their responses.

This frontend application needs to be run in conjunction with the project backend, which is located at [AI Chatbot Backend](https://github.com/nicolegunn/ai-chatbot-backend.git).

## Features

- Interactive UI for the AI interviewer
- Interface for the chatbot to recommend insurance policies
- Communicates with the backend for data retrieval and storage

## Technologies Used

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Google Generative AI](https://img.shields.io/badge/Google%20Generative%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

## Prerequisites

![Node](https://img.shields.io/badge/Node.js-16.0.0-green)
![npm](https://img.shields.io/badge/npm-8.0.0-red)

- Node.js (v16 or later)
- npm (v8 or later) or yarn (v1.22 or later)

## Installation and Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/nicolegunn/ai-chatbot-frontend.git
   ```
2. **Navigate to the project directory**:
   ```sh
   cd ai-chatbot-frontend
   ```
3. **Create a .env file in the root directory and add your environment variables**:
   ```env
   VITE_REACT_APP_BACKEND_URL=http://localhost:4000
   ```
4. **Install dependencies**:
   ```sh
   npm install
   ```
5. **Run the application**:
   ```sh
   npm run dev
   ```
6. **Clone and setup the frontend**:  
   The frontend needs to be run in conjunction with the backend, which is located at [AI Chatbot Backend](https://github.com/nicolegunn/ai-chatbot-backend.git).

   ```sh
   git clone https://github.com/nicolegunn/ai-chatbot-backend.git
   cd ai-chatbot-backend
   npm install
   npm run dev
   ```

## Contributors

### **Nicole Gunn**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nicole-gunn-a582ba23b/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nicolegunn)

### **Kaitlyn Rohm**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kaitlyn-rohm-083612307/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kaitlynrohm)

### **Cyrus Wen**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cyrus-wen/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/cyy963)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
