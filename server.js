const app = require('express')();
const server = require('http').createServer(app);
require('dotenv').config();
const Redis = require('ioredis');
const { formatMessage, sendMessage } = require('./socket/utils/messages');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./socket/utils/users');

const redisPort = process.env.REDIS_PORT;
const redisHost = process.env.REDIS_HOST;
const socketPort = process.env.SOCKET_PORT || 3000;
const redis = new Redis(redisPort, redisHost);

// create socket server
const io = require('socket.io')(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
});


const botName = "Yeabrak";

// Run when client connects
io.on('connection', socket => {
    // redis subscribes to a laravel channel
    redis.subscribe('testChannel', (message) => {
        io.emit('message', message);
    });

    redis.on('message', (channel, message) => {
        console.log(message)
        io.emit('message', message)
    });

    socket.on('sendMessage', (message) => {
        sendMessage(message)
    })

    // join room
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

        socket.join(user.room);

        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage(botName, `${user.username} has joined the chat`)
            );

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                'message',
                formatMessage(botName, `${user.username} has left the chat`)
            );

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});

server.listen(socketPort, () => {
    console.log(`Up & Running. Go to: http://localhost:${socketPort}`);
});
