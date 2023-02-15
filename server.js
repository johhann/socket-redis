const app = require('express')();
const server = require('http').createServer(app);
require('dotenv').config();

const redisPort = process.env.REDIS_PORT;
const redisHost = process.env.REDIS_HOST;

console.log("Redis Host: " + process.env.REDIS_HOST);
console.log("Redis Port: " + process.env.REDIS_PORT);

const io = require('socket.io')(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
});
const Redis = require('ioredis');
const redis = new Redis(redisPort, redisHost);

redis.subscribe('redis_socket_database_testChannel', () => {
    console.log('subscribed to: redis_socket_database_testChannel');
});

let users = [];


io.on('connection', (socket) => {
    console.log('A client connected');
    // socket.on('subscribe',(data)=>{
    //    io.emit("testChannel",data)
    // })
    redis.on('message', (channel, message) => {

        //1. find receiver id from user pool

        console.log("message received");
        message  = JSON.parse(message);

        io.emit('testChannel', message);
        io.to(socket.id).emit()

        io.emit(channel + ':' + message.event, message.data);
        console.log(channel + ':' + message.event, message.data);

    })

    socket.on('send-message',({rid})=>{
        //1. remove user from users pool

        const m= users.find()
        io.to(m.SocketId).emit()
        console.log("user disconnected");
    })


    socket.join('room-1', () => {

    });


    socket.on('disconnect',()=>{
        //1. remove user from users pool

        console.log("user disconnected");
    })

    socket.on('addUser', (userId) => {
        //1. find user exists in user pool

        //2. return if user exists in users pool

        //3. add user to users pool if doesn't exist
        users.push({
            userId : 1, // extract from api request - auth()->id and path it to socket with event
            socketId : socket.id // from socket
        });
    });
});


const broadcastPort = 3000;

server.listen(broadcastPort, () => {
    console.log("Listening on port:" + broadcastPort);
});

app.get('/', (req, res)=> {
    return res.json("john");
})
