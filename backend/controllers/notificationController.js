import Notification from "../models/Notification.js";

// Get user notifications
export const getNotifications = async (req, res) => {
  const {id} = req.params
  try {
    const notifications = await Notification.find({userId: id});
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  

// Mark a notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.find(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found." });

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: "Notification marked as read." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
