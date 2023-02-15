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

redis.subscribe('redis_socket_database_test-channel', () => {
    console.log('subscribed to: test-channel');
});



io.on('connection', (socket) => {
    console.log('A client connected');
    // socket.on('subscribe',(data)=>{
    //    io.emit("testChannel",data)
    // })
    redis.on('message', (channel, message) => {
        console.log("message received");
        message  = JSON.parse(message);
        io.emit('testChannel', "message");

        // io.emit(channel + ':' + message.event, message.data);
        // console.log(channel + ':' + message.event, message.data);

    })

    socket.on('disconnect',()=>{
        console.log("user disconnected");
    })
});


const broadcastPort = 3000;

server.listen(broadcastPort, () => {
    console.log("Listening on port:" + broadcastPort);
});

app.get('/', (req, res)=> {
    return res.json("john");
})
