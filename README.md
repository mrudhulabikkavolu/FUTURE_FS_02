# FUTURE_FS_02 — Mini CRM System

## 📌 Project Overview

Mini CRM System is a full-stack MERN application developed as part of the Future Interns Internship Task 2.

The application helps users manage customer leads efficiently through a modern CRM dashboard with authentication, lead management, search functionality, analytics cards, and responsive UI.

This project demonstrates practical implementation of:

* Frontend Development
* Backend API Development
* Database Integration
* Authentication System
* CRUD Operations
* Deployment of Full Stack Applications

---

# 🚀 Live Project

## Frontend (Vercel)

[https://future-fs-2-qy1ypvczu-mrudhulabikkavolus-projects.vercel.app/](https://future-fs-2-qy1ypvczu-mrudhulabikkavolus-projects.vercel.app/)

## Backend (Render)

[https://future-fs-02-7rgs.onrender.com](https://future-fs-02-7rgs.onrender.com)

## GitHub Repository

[https://github.com/mrudhulabikkavolu/FUTURE_FS_02](https://github.com/mrudhulabikkavolu/FUTURE_FS_02)

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

## Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

---

# ✨ Features

## 🔐 Authentication System

* User Login
* JWT Token Authentication
* Secure Session Handling
* Logout Functionality

---

## 📋 Lead Management

Users can:

* Add Leads
* View Leads
* Edit Leads
* Delete Leads
* Search Leads

---

## 📊 Dashboard Analytics

Dashboard cards display:

* Total Leads
* Interested Leads
* Converted Leads
* Closed Leads

---

## 🎨 UI Features

* Responsive Design
* Modern Dashboard UI
* Color-coded Lead Status
* Search Bar
* Table View
* Form Validation

---

# 📂 Project Structure

```bash
FUTURE_FS_02/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── assets/
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   │   ├── Lead.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── leadRoutes.js
│   │   └── authRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/mrudhulabikkavolu/FUTURE_FS_02.git
```

---

## 2️⃣ Navigate to Project

```bash
cd FUTURE_FS_02
```

---

# 🔧 Backend Setup

## Go to Server Folder

```bash
cd server
```

## Install Dependencies

```bash
npm install
```

## Create .env File

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

## Start Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 💻 Frontend Setup

## Go to Client Folder

```bash
cd client
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🧠 Database Design

## Lead Schema

Fields used:

* name
* email
* phone
* company
* status
* notes

---

## User Schema

Fields used:

* name
* email
* password

Passwords are encrypted using bcryptjs.

---

# 🔌 API Endpoints

## Authentication APIs

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

---

## Lead APIs

### Get All Leads

```http
GET /api/leads
```

### Add Lead

```http
POST /api/leads/add
```

### Update Lead

```http
PUT /api/leads/:id
```

### Delete Lead

```http
DELETE /api/leads/:id
```

---

# 🌐 Deployment Process

## Backend Deployment

Backend deployed using Render:

* Connected GitHub Repository
* Added Environment Variables
* Configured Root Directory
* Added MongoDB URI
* Started Node Server

---

## Frontend Deployment

Frontend deployed using Vercel:

* Imported GitHub Repository
* Set Root Directory as client
* Configured Vite Build
* Connected Frontend with Render Backend

---

# 📸 Application Modules

## Login Page

* User authentication
* JWT token storage
* Secure login flow

---

## CRM Dashboard

* Dashboard analytics cards
* Lead form
* Lead table
* Search functionality

---

## Lead Operations

* Add Lead
* Edit Lead
* Delete Lead
* Dynamic Status Update

---

# 📚 Concepts Learned

During this project, the following concepts were learned and implemented:

* React Hooks
* useState
* useEffect
* API Integration
* Axios Requests
* REST APIs
* MongoDB Atlas Integration
* Express Routing
* JWT Authentication
* CRUD Operations
* Tailwind CSS Styling
* MERN Stack Deployment
* Git & GitHub
* Vercel Deployment
* Render Deployment

---

# 🧪 Future Improvements

Possible future enhancements:

* Role-based Authentication
* Dark Mode
* Export Leads to Excel/PDF
* Charts & Analytics
* Email Notifications
* Advanced Filtering
* Pagination
* Mobile App Version

---

# 👩‍💻 Developed By

Mrudhula Bikkavolu

Future Interns Internship — Task 2

---

# 📄 License

This project is developed for educational and internship purposes.
