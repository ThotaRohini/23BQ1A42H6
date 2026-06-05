const { v4: uuid } = require("uuid");

const notifications = require("../models/notificationStore");
const {
    addToQueue
} = require("../services/notificationQueue");
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

addToQueue(notification);

res.status(201).json({
    message: "Notification queued successfully",
    notification
});
};

exports.getNotifications = (req, res) => {
    const userId = req.query.userId;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filtered = notifications.filter(
        n => n.userId == userId
    );

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = filtered.slice(
        startIndex,
        endIndex
    );

    res.json({
        page,
        limit,
        totalNotifications: filtered.length,
        data: paginatedData
    });
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