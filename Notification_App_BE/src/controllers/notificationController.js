const { v4: uuid } = require("uuid");

const notifications = require("../models/notificationStore");

exports.createNotification = (req, res) => {
    const notification = {
        id: uuid(),
        userId: req.body.userId,
        title: req.body.title,
        message: req.body.message,
        type: req.body.type,
        priority: req.body.priority || "MEDIUM",
        isRead: false,
        createdAt: new Date()
    };

    notifications.push(notification);

    res.status(201).json(notification);
};

exports.getNotifications = (req, res) => {
    const userId = Number(req.query.userId);

    const result = notifications.filter(
        n => n.userId === userId
    );

    res.json(result);
};

exports.getUnreadNotifications = (req, res) => {
    const userId = Number(req.query.userId);

    const result = notifications.filter(
        n => n.userId === userId && !n.isRead
    );

    res.json(result);
};

exports.markAsRead = (req, res) => {
    const notification = notifications.find(
        n => n.id === req.params.id
    );

    if (!notification) {
        return res.status(404).json({
            message: "Notification not found"
        });
    }

    notification.isRead = true;

    res.json({
        message: "Notification marked as read"
    });
};

exports.deleteNotification = (req, res) => {
    const index = notifications.findIndex(
        n => n.id === req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Notification not found"
        });
    }

    notifications.splice(index, 1);

    res.json({
        message: "Notification deleted"
    });
};