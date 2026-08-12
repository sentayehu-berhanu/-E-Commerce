const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');

// @desc    Get all notifications for user
// @route   GET /api/notifications
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    
    // Auto-generate mock notifications for portfolio demonstration if none exist
    if (notifications.length === 0) {
      await Notification.insertMany([
        { user: req.user._id, message: 'Your order #1024 has shipped.', type: 'order', isRead: false },
        { user: req.user._id, message: 'Your favorite product is back in stock.', type: 'alert', isRead: false },
        { user: req.user._id, message: 'Flash sale starts in 30 minutes.', type: 'alert', isRead: false },
        { user: req.user._id, message: 'Your order has been delivered.', type: 'order', isRead: false }
      ]);
      notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    }
    
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error fetching notifications' });
  }
});

// @desc    Mark a notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Private
router.patch('/:id/read', protect, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Ensure the notification belongs to the user
    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this notification' });
    }

    notification.isRead = true;
    const updatedNotification = await notification.save();
    res.json(updatedNotification);
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ message: 'Server error updating notification' });
  }
});

// @desc    Mark all notifications as read
// @route   PATCH /api/notifications/read-all
// @access  Private
router.patch('/read-all', protect, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { $set: { isRead: true } }
    );
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error updating notifications:', error);
    res.status(500).json({ message: 'Server error updating notifications' });
  }
});

module.exports = router;
