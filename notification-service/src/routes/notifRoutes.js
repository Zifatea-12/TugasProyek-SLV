const express = require('express');
const router = express.Router();

const {
  sendNotification,
  getNotifications,
  deleteNotification,
} = require('../controllers/notifController');

router.post('/', sendNotification);
router.get('/', getNotifications);
router.delete('/:id', deleteNotification);

module.exports = router;
