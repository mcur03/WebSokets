const socket = io()

// DOM element
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let action = document.getElementById('action');

btn.addEventListener('click', function(){
    socket.emit('chat:message',{
        message: message.value,
        username: username.value
    });
});

message.addEventListener('keypress', function (){
    console.log(username.value);
    socket.emit('chat:typing', username.value);
})

socket.on('chat:message', function(data){
    action.innerHTML = '';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on('chat:typing', function (data){
    action.innerHTML = `<p><em>${data} esta escribiendo.</em></p>`
});