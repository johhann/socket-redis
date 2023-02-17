<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Redis | Socket</title>

        <!-- Fonts -->
        <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    </head>
    <body class="antialiased">

        <h2>Redis Socket</h2>

        <button onclick="sendMessage()">Send</button>


        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.4/socket.io.min.js" integrity="sha512-HTENHrkQ/P0NGDFd5nk6ibVtCkcM7jhr2c7GyvXp5O+4X6O5cQO9AhqFzM+MdeBivsX7Hoys2J7pp2wdgMpCvw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script>
            const socket = io.connect('ws://localhost:3000');

            socket.on('connect', () => {
                console.log("Connected to Socket");
            });

            const user = {username: 'john', room: 'Laravel'}

            socket.emit('joinRoom', user);

            socket.on('message', (data) => {
                console.log(data);
            });

            socket.on('testChannel', (data) => {
                console.log(data);
            });

            function sendMessage(e){
                // e.preventDefault();

                socket.emit('sendMessage', 'How are you?');
            }
        </script>
    </body>
</html>
