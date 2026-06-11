require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const notifRoutes = require('./src/routes/notifRoutes');

app.use('/notifications', notifRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Notification service is running'
  });
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Notification service running on port ${PORT}`));
