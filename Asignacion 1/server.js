// server
require('net').createServer(function (socket) {
    console.log("connected");

    socket.on('data', function (data) {
        console.log(data.toString());
    });
    socket.write('HTTP/1.1 200 OK\n\n Peticion recibida.')
    socket.end();
})

.listen(8080);
