const path = require('path');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start port
const server = app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});

const socketio = require('socket.io');
const io = socketio(server)


io.on('connection', (socket)=>{
    console.log('new connection', socket.id); 

    socket.on('chat:message',(data) =>{
        io.sockets.emit('chat:message', data);
    })

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    })
});

