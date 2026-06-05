const queue = [];

const addToQueue = (notification) => {
    queue.push(notification);

    queue.sort((a, b) => {
        return b.priority - a.priority;
    });
};

const processQueue = () => {
    if (queue.length === 0) return;

    const notification = queue.shift();

    console.log(
        `Processing Priority ${notification.priority}: ${notification.title}`
    );
};

setInterval(processQueue, 5000);

module.exports = {
    addToQueue,
    queue
};