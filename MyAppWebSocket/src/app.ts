import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

// Configurar WebSocket con Socket.IO
const io = new Server(httpServer);

// Middleware para servir archivos estáticos
app.use(express.static("public"));

// Evento de conexión
io.on("connection", (socket) => {
    console.log("Usuario conectado");

  // Escuchar mensajes del cliente
    socket.on("message", (msg) => {
        console.log("Mensaje recibido: ", msg);

        // Enviar el mensaje a todos los clientes conectados
        io.emit("message", msg);
    });

  // Evento de desconexión
  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

// Iniciar el servidor en el puerto 3000
httpServer.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
