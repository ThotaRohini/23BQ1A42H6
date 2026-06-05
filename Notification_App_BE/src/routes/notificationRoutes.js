const express = require("express");

const router = express.Router();

const controller = require(
    "../controllers/notificationController"
);

router.post("/", controller.createNotification);

router.get("/", controller.getNotifications);

router.get(
    "/unread",
    controller.getUnreadNotifications
);

router.patch(
    "/:id/read",
    controller.markAsRead
);

router.delete(
    "/:id",
    controller.deleteNotification
);

module.exports = router;