<div align="center">

# ChatFlow

Real-time one-to-one chat application built with React, Redux Toolkit, Express, MongoDB, and Socket.IO.

<p>
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React badge" />
  <img src="https://img.shields.io/badge/Backend-Express-111111?style=for-the-badge&logo=express&logoColor=white" alt="Express badge" />
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB badge" />
  <img src="https://img.shields.io/badge/Realtime-Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.IO badge" />
</p>

</div>

## Preview

<img src="./Pictures/Screenshot%202026-03-25%20141152.png" alt="Convoo application preview" width="100%" />

## About The Project

Convoo is a full-stack chatting platform focused on fast, clean, real-time communication. The application combines a modern React interface with an Express and Socket.IO backend to deliver authentication, live messaging, online presence tracking, and a dashboard-style chat experience.

The repository contains the frontend in the project root and the backend inside `server/`.

## Highlights

- OTP-based signup flow
- Login with email or username
- JWT-protected routes
- User search for starting conversations
- One-to-one real-time messaging
- Online user presence updates
- Notification sound for new messages
- Dashboard with profile and chat views

## Screenshots

<table>
  <tr>
    <td><img src="./Pictures/Screenshot%202026-03-25%20141152.png" alt="Convoo screenshot 1" width="100%" /></td>
    <td><img src="./Pictures/Screenshot%202026-03-25%20141210.png" alt="Convoo screenshot 2" width="100%" /></td>
  </tr>
  <tr>
    <td><img src="./Pictures/Screenshot%202026-03-25%20141217.png" alt="Convoo screenshot 3" width="100%" /></td>
    <td><img src="./Pictures/Screenshot%202026-03-25%20141435.png" alt="Convoo screenshot 4" width="100%" /></td>
  </tr>
  <tr>
    <td><img src="./Pictures/Screenshot%202026-03-25%20141459.png" alt="Convoo screenshot 5" width="100%" /></td>
    <td><img src="./Pictures/Screenshot%202026-03-25%20142758.png" alt="Convoo screenshot 6" width="100%" /></td>
  </tr>
</table>

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

## Getting Started

### 1. Install dependencies

Install frontend dependencies from the project root:

```bash
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
REACT_APP_BASE_URL=
```

Create a `server/.env` file:

```env
PORT_NO=
DB_URL=
JWT_SECRET=
FRONTEND_URL=
CLOUD_NAME=
API_KEY=
API_SECRET=
HOST_NAME=
MAIL_USER=
MAIL_PASS=
```

Fill these values with your own local or deployment configuration. Do not commit real secrets to GitHub.

### 3. Run the project

Run frontend and backend together from the project root:

```bash
npm run dev
```

This starts:

- Frontend on `http://localhost:3000`
- Backend on `http://localhost:4000`

Run them separately if needed:

```bash
npm start
```

```bash
cd server
npm run dev
```

## Application Routes

### Frontend

- `/` - Landing page
- `/login` - Login page
- `/signup` - Signup page
- `/otp-verify` - OTP verification page
- `/dashboard` - Dashboard home
- `/dashboard/profile` - Profile page
- `/dashboard/message` - Chat page

### Backend API

- `POST /Convoo/auth/send_otp`
- `POST /Convoo/auth/signup`
- `POST /Convoo/auth/login`
- `POST /Convoo/auth/logout`
- `POST /Convoo/message/send_message/:id`
- `GET /Convoo/message/recieve_messages/:id`
- `GET /Convoo/search_user/search`
- `GET /Convoo/search_user/get_chatters`

## How It Works

1. A user requests an OTP using an email address.
2. The backend generates and sends the OTP through the configured mail service.
3. After verification, the user can create an account.
4. Login returns a JWT token for protected access.
5. Socket.IO connects the user for real-time updates.
6. Messages are stored in MongoDB and pushed instantly to online recipients.

## Available Scripts

From the project root:

- `npm start` - Start the React app
- `npm run build` - Build the frontend
- `npm test` - Run frontend tests
- `npm run server` - Start the backend
- `npm run dev` - Start frontend and backend together

From `server/`:

- `npm start` - Start the backend with Node
- `npm run dev` - Start the backend with Nodemon

## Roadmap

- Typing indicators
- Read receipts
- Media and file sharing
- Persisted profile editing
- `.env.example` files
- Automated backend tests

## Note

This README intentionally uses blank environment placeholders instead of real values. Keep all credentials, database URLs, mail settings, and API secrets private.
