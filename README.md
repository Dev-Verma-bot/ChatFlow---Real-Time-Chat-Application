# Convoo Chat Application

Convoo is a full-stack real-time chat application built with React, Redux Toolkit, Express, MongoDB, and Socket.IO. It supports OTP-based signup, JWT authentication, one-to-one messaging, user search, and live online presence updates.

## Overview

This repository contains:

- A React frontend in the project root
- An Express backend inside `server/`
- Real-time messaging powered by Socket.IO
- MongoDB for persistent user, profile, conversation, and message data

## Features

- Email OTP signup flow
- Login with email or username
- JWT-based protected routes
- User search
- One-to-one chat conversations
- Real-time incoming messages
- Online user status
- Notification sound for new messages
- Dashboard with profile and messaging views

## Project Structure

```text
.
+-- package.json
+-- public/
+-- src/
|   +-- Components/
|   +-- Pages/
|   +-- Services/
|   +-- Slices/
|   `-- SocketManager.jsx
`-- server/
    +-- App.js
    +-- Configuration/
    +-- Controllers/
    +-- Middlewares/
    +-- Modals/
    +-- Routes/
    +-- Socket/
    `-- Utils/
```

## Tech Stack

### Frontend

- React
- React Router DOM
- Redux Toolkit
- React Hook Form
- Tailwind CSS
- Axios
- Framer Motion
- Socket.IO Client

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT
- Bcrypt
- Nodemailer
- Cloudinary
- Socket.IO
- Express File Upload

## Environment Variables

Create two environment files.

### Frontend `.env`

Create `.env` in the project root:

```env
REACT_APP_BASE_URL=http://localhost:4000
```

### Backend `server/.env`

Create `server/.env`:

```env
PORT_NO=4000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

HOST_NAME=smtp.your-provider.com
MAIL_USER=your_email_address
MAIL_PASS=your_email_password_or_app_password
```

## Installation

Install frontend dependencies from the project root:

```bash
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

## Running The Project

### Run frontend and backend together

From the project root:

```bash
npm run dev
```

This starts:

- Frontend on `http://localhost:3000`
- Backend on `http://localhost:4000`

### Run them separately

Frontend:

```bash
npm start
```

Backend:

```bash
cd server
npm run dev
```

## Main Frontend Routes

- `/` - Landing page
- `/login` - Login page
- `/signup` - Signup page
- `/otp-verify` - OTP verification page
- `/dashboard` - Dashboard home
- `/dashboard/profile` - Profile page
- `/dashboard/message` - Chat page

## Main Backend API Routes

Base URL:

```text
http://localhost:4000
```

Auth:

- `POST /Convoo/auth/send_otp`
- `POST /Convoo/auth/signup`
- `POST /Convoo/auth/login`
- `POST /Convoo/auth/logout`

Conversations:

- `POST /Convoo/message/send_message/:id`
- `GET /Convoo/message/recieve_messages/:id`

Users:

- `GET /Convoo/search_user/search`
- `GET /Convoo/search_user/get_chatters`

## How The App Works

1. A user enters an email to request an OTP.
2. The backend generates and emails the OTP.
3. The user signs up after OTP verification.
4. The user logs in and receives a JWT token.
5. Protected dashboard routes become available.
6. Socket.IO connects the logged-in user for live updates.
7. Messages are stored in MongoDB and delivered instantly to online recipients.

## Scripts

From the project root:

- `npm start` - Start the React app
- `npm run build` - Build the frontend
- `npm test` - Run frontend tests
- `npm run server` - Start the backend
- `npm run dev` - Start frontend and backend together

From `server/`:

- `npm start` - Start backend with Node
- `npm run dev` - Start backend with Nodemon

## Notes

- The backend for this project lives inside the `server/` folder.
- Cloudinary is configured in the backend and upload utilities already exist.
- Some files in `src/Services` contain older or unused endpoints from another codebase, while the active chat flow uses the `Convoo` routes listed above.
- There is no dedicated automated backend test suite configured yet.

## Future Improvements

- Typing indicators
- Read receipts
- Media and file sharing
- Persisted profile editing
- `.env.example` files
- Automated backend tests
