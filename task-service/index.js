require('dotenv').config();
const express = require('express');
const cors = require('cors');

const taskRoutes = require('./src/routes/taskRoutes');
// Inisialisasi koneksi DB
require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/', (req, res) => res.json({ message: 'Task service is running' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Task service listening on port ${PORT}`);
});
