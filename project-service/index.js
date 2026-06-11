const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const db = require('./src/config/db');
const pkg = require('./package.json');
let dbConnected = false;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  const uptime = process.uptime();
  const version = pkg.version || process.env.npm_package_version || 'unknown';
  const dbStatus = dbConnected ? 'connected' : 'disconnected';

  res.json({
    status: 'ok',
    uptime,
    version,
    db: dbStatus,
    timestamp: new Date().toISOString()
  });
});

const projectRoutes = require('./src/routes/projectRoutes');
app.use('/api/projects', projectRoutes);

async function startServer() {
  try {
    if (typeof db === 'function') {
      await db();
    } else if (db && typeof db.connect === 'function') {
      await db.connect();
    } else {
      throw new Error('DB module does not export a connect function');
    }

    // mark DB as connected for health checks
    dbConnected = true;

    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => {
      console.log(`Project service listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }
}

startServer();
