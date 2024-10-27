const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const summaryRoutes = require('./routes/summary');
const WebSocket = require('ws');
const http = require('http');

require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/summary', summaryRoutes);

const server = http.createServer(app);

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Simulate real-time updates
  setInterval(() => {
    const transaction = {
      id: Math.random().toString(36).substr(2, 9),
      amount: Math.random() * 1000,
      date: new Date(),
      type: Math.random() > 0.5 ? 'credit' : 'debit',
      status: 'successful'
    };
    ws.send(JSON.stringify(transaction));
  }, 5000);

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));