# Stage 2: Database Schema Design
# Stage 3: Query Optimization

## Existing Query

SELECT *
FROM notifications
WHERE user_id = '1042'
AND is_read = FALSE
ORDER BY created_at DESC;

## Problems

* Full table scan on large datasets.
* Fetches unnecessary columns.
* No pagination support.

## Optimized Query

SELECT id, title, message, created_at
FROM notifications
WHERE user_id = '1042'
AND is_read = FALSE
ORDER BY created_at DESC
LIMIT 20;

## Composite Index

CREATE INDEX idx_notifications_user_read_created
ON notifications(user_id, is_read, created_at DESC);

## Additional Improvements

1. Pagination using LIMIT and OFFSET.
2. Cursor-based pagination for very large datasets.
3. Partition notifications by date.
4. Cache frequently accessed notifications.

## Notifications Table

| Column     | Type         | Description                 |
| ---------- | ------------ | --------------------------- |
| id         | UUID         | Unique notification id      |
| user_id    | VARCHAR(50)  | User receiving notification |
| title      | VARCHAR(255) | Notification title          |
| message    | TEXT         | Notification content        |
| priority   | INT          | Priority level              |
| is_read    | BOOLEAN      | Read status                 |
| created_at | TIMESTAMP    | Creation time               |
| updated_at | TIMESTAMP    | Last updated time           |

## SQL Schema

CREATE TABLE notifications (
id UUID PRIMARY KEY,
user_id VARCHAR(50) NOT NULL,
title VARCHAR(255) NOT NULL,
message TEXT NOT NULL,
priority INT DEFAULT 5,
is_read BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

## Indexes

CREATE INDEX idx_user_notifications
ON notifications(user_id);

CREATE INDEX idx_unread_notifications
ON notifications(user_id, is_read);

CREATE INDEX idx_priority_notifications
ON notifications(priority);

## Design Decisions

* UUID ensures globally unique notification IDs.
* Composite indexes improve lookup speed.
* Priority column supports future queue processing.
* Timestamp columns support sorting and auditing.
