module.exports = (io) => {
    io.on('connection', (socket) => {

        console.log('a user connected ' + socket.id);

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('my message', (msg) => {
            console.log('message: ' + msg);
        });
    });
}