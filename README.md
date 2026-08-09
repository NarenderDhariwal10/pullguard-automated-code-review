# PullGuard – Automated Code Review System 🤖

PullGuard is an **AI-powered automated code review system** that integrates with **GitHub Pull Requests** to provide instant feedback and suggestions, helping developers write cleaner, more maintainable code.

![Screenshot](/pullguard-frontend/docs/Screenshot.png)

## 🚀 Features
- **GitHub OAuth** authentication
- Automatic PR code review using **OPENROUTER AI -Mistral**
- **Dashboard** to view repositories and reviews
- **BullMQ + Redis** for background job processing
- **MongoDB** for storing review history
- **Express.js** backend + **React.js (Vite)** frontend
- **Bootstrap 5** UI styling

## 🏗 Tech Stack
**Frontend:** React, Vite, Bootstrap 5  
**Backend:** Node.js, Express.js, MongoDB, BullMQ, GitHub API  
**AI Integration:** OPENROUTER AI (Mistral)  
**Other:** Redis, JWT Auth, dotenv

## 📂 Project Structure
```bash
pullguard/
├── backend/
│   ├── server.js
│   ├── .env
│   ├── package.json
│   ├── config/
│   │   ├── connectDB.js
│   │   └── passportConfig.js
│   ├── controllers/
│   │   └── reviewController.js
│   ├── queues/
│   │   └── reviewQueue.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── webhookRoutes.js
│   ├── models/
│   │   ├── reviewModel.js
│   │   └── userModel.js
│   ├── services/
│   │   ├── githubService.js
│   │   └── openaiService.js
│   ├── utils/
│   │   └── helpers.js
│   ├── middleware/
│   │   └── webhookValidator.js
│   ├── jobs/
│   │   └── reviewJob.js
│   ├── workers/
│   │   └── queueWorker.js
│
├── pullguard-frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── hooks/
│   │   │   └── useAuth.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Loader.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Repos.jsx
│   │   │   ├── Reviews.jsx
│   │   │   ├── ReviewDetail.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── Login.jsx
│   ├── public/
│   ├── package.json
│
├── README.md
├── .gitignore
└── LICENSE
        
```
## How to start
docker-compose up
lt --port 3000 --subdomain pullguard-api

## 👨‍💻 Author

**Narender Dhariwal**
- 💼 Aspiring Full Stack Developer (MERN)
- 🎓 Final Year Engineering Student
- 🔗 [LinkedIn](https://linkedin.com/in/narender-dhariwal=053a162259)
- 🧑‍💻 [GitHub](https://github.com/NarenderDhariwal10)
