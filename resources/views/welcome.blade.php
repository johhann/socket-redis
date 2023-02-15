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


        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.4/socket.io.min.js" integrity="sha512-HTENHrkQ/P0NGDFd5nk6ibVtCkcM7jhr2c7GyvXp5O+4X6O5cQO9AhqFzM+MdeBivsX7Hoys2J7pp2wdgMpCvw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script>
            console.log('hello');
            const socket = io.connect('ws://localhost:3000');

            socket.emit('subscribe', 'test-channel message');

            socket.on('testChannel', (data) => {
                console.log(data);
            });
            socket.on('connect', () => {
                console.log("you are connected");
            });
        </script>
    </body>
</html>