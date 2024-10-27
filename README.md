# Real-Time Financial Transaction Dashboard

This project is a real-time financial transaction dashboard built with React.js for the frontend and Node.js for the backend. It displays transaction data, provides summary metrics, and includes real-time updates.

## Features

- Real-time transaction updates
- Historical transaction data with filtering and pagination
- Summary metrics and trend charts
- Secure authentication using JWT
- Responsive design for desktop and tablet

## Tech Stack

- Fronten
  - React.js
  - TypeScript
  - Tailwind CSS
  - Chart.js
  - Axios for API calls
  - WebSocket for real-time updates
- Backend
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - WebSocket for real-time updates

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/financial-dashboard.git
   cd financial-dashboard
   ```

2. Install dependencies:
   ```
   npm run install-all
   ```

3. Set up environment variables:
   - In the `server` directory, create a `.env` file based on `.env.example` and fill in your MongoDB URI and JWT secret.

4. Start the development servers:
   ```
   npm start
   ```

The client will be available at `http://localhost:3000` and the server at `http://localhost:5000`.

## Project Structure

```
financial-dashboard/
├── client/           # React frontend
├── server/           # Node.js backend
└── package.json      # Root package.json for running both client and server
```

## API Endpoints

- `POST /api/auth/login`: User login
- `GET /api/transactions`: Get paginated transactions
- `GET /api/summary`: Get transaction summary data

## WebSocket

The server uses WebSocket to push real-time transaction updates to connected clients.