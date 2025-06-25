# 🧠 ResumeLens – AI-Powered Resume Analyzer (MERN Stack)

ResumeLens is a full-stack AI-powered web application designed to intelligently analyze resumes and job descriptions using Generative AI. The platform provides personalized resume feedback, interview question generation, and real-time analysis to help job seekers better align with specific job roles.

---

## 🚀 Key Features

- ⚙️ **MERN Stack Application** – Modular frontend and backend architecture using MongoDB, Express, React, and Node.js.
- 🔐 **User Authentication with Email OTP Verification** – Implements secure user registration with OTP-based email verification (Zero Trust model).
- 🧠 **AI-Powered Resume Analysis** – Utilizes Google Gemini API to:
  - Compare Resume and Job Description
  - Extract and analyze user’s **Strengths**, **Weaknesses**, and **Suggestions**
  - Calculate **Match Rate** with respect to **Job Description** and **Current Role**
- 🎯 **Interview Question Generator** – Automatically generates targeted interview questions based on:
  - Resume content
  - Job description
  - User’s specified role
- 📊 **Real-Time Dashboard** – Clean and responsive dashboard with visual analysis and feedback metrics.
- 👤 **User Profile Management** – Each user has a dedicated dashboard to:
  - Upload resume
  - Input job description and role
  - View past analysis and feedback history
- 💬 **User Feedback System** – Collects user satisfaction ratings and qualitative feedback to improve AI suggestions.
- 💻 **Responsive and Neat UI** – Built using React.js and Tailwind CSS for smooth interactions and modern UX.
- ☁️ **Cloud Deployment** – Hosted using a hybrid deployment setup:
  - Frontend deployed on **Render**
  - Backend and database on **AWS EC2** and **S3**

---

## 🛠️ Tech Stack

| Layer       | Technology                |
|-------------|----------------------------|
| Frontend    | React.js, Tailwind CSS     |
| Backend     | Node.js, Express.js        |
| Database    | MongoDB Atlas              |
| AI Services | Google Gemini API          |
|Auth/Security| Nodemailer (OTP), JWT      |
| Cloud       | AWS EC2, S3, Render        |
| Dev Tools   | Git, GitHub, Postman       |

---

## 📦 Local Setup & Installation

```bash
# Clone the repository
git clone https://github.com/nithin7204/resumeLens.git
cd resumeLens

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../client
npm install

# Run both servers
npm run dev
