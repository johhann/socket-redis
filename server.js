const app = require('express')();
const server = require('http').createServer(app);
require('dotenv').config();
const Redis = require('ioredis');
const redisPort = process.env.REDIS_PORT;
const redisHost = process.env.REDIS_HOST;
const redis = new Redis(redisPort, redisHost);


// redis subscribes to a laravel channel
redis.subscribe('testChannel', () => {
    console.log('subscribed to channel');
});

// create socket server
const io = require('socket.io')(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
});

let users = [];

io.on('connection', (socket) => {
    console.log('A client connected');
    addUserToPool();
    socket.on('subscribe', (data) => {
        io.emit("testChannel", data)
    })

    disconnect();

    redis.on('message', (channel, message) => {

        //1. find receiver id from user pool
        console.log("message received");
        message = JSON.parse(message);

        io.emit('testChannel', message);
        io.to(socket.id).emit()

        io.emit(channel + ':' + message.event, message.data);
        console.log(channel + ':' + message.event, message.data);

    })

    socket.on('testChannel', ({ rid }) => {
        //1. remove user from users pool

        const m = users.find()
        io.to(m.SocketId).emit()
        console.log("user disconnected");
    })


    // socket functions
    function disconnect() {
        socket.on('disconnect', (socket) => {
            //1. remove user from users pool
            console.log("User disconnected");
        });
    }

    function addUserToPool() {
        socket.on('addUser', (userId) => {
            //1. find user exists in user pool
            //2. return if user exists in users pool
            //3. add user to users pool if doesn't exist
            users.push({
                userId: 1,
                socketId: socket.id
            });
        });
        console.log("Added user to pool.");
        console.log(users);
    }
});


const broadcastPort = 3000;

server.listen(broadcastPort, () => {
    console.log("Listening on port:" + broadcastPort);
});

app.get('/', (req, res) => {
    return res.json("john");
})
