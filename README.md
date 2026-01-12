ReWise – Smart Study Scheduler

ReWise is a full-stack web application that helps students manage their studies using smart revision scheduling.
The idea is simple: don’t just study once — revise at the right time so you actually remember it.

This project was built to understand real-world full-stack development, deployment, and authentication flow.

🔗 Live Project

👉 Frontend (Live App)
https://smart-study-scheduler-re-wise-oade.vercel.app

🛠 Tech Stack

Frontend

React (Vite)

Tailwind CSS

Axios

React Context API

Backend

Node.js

Express.js

MongoDB Atlas

JWT Authentication

Cron Jobs (for revision reminders)

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

✨ Features

User authentication (Signup & Login)

Secure password hashing using bcrypt

JWT-based authorization

Add, update, and delete study topics

Smart revision scheduling logic

Track next revision date automatically

Protected routes (only logged-in users can access data)

Fully deployed and working production setup

🧠 Why I Built This

Many students study topics once and forget them later.
I wanted to build something that helps with revision timing, not just note-taking.

This project helped me learn:

How frontend and backend actually connect in production

CORS issues and real deployment bugs

MongoDB Atlas setup and cloud database handling

Hosting frontend and backend separately

Debugging real-world errors (not tutorial ones)

📂 Project Structure
smart-study-scheduler-ReWise/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── cron/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── services/
│
└── README.md

🔐 Environment Variables

Backend uses the following environment variables:

MONGO_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=


Frontend uses:

VITE_API_URL=https://<backend-url>/api

🚀 How to Run Locally
Backend
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm run dev

📌 Current Status

✅ Authentication working
✅ Database connected
✅ Fully deployed
✅ Ready to be used and extended

Future improvements:

Notifications page improvements

Email reminder UI

Better dashboard analytics

Mobile-friendly UI

🙋‍♂️ Author

Tanmay Praabhanjan
Computer Science Engineer
Interested in Full-Stack Development & Backend Systems
