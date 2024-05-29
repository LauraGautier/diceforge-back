import { Server as WebsocketServer } from "socket.io";

function setupSocket(httpServer) {
    const io = new WebsocketServer(httpServer, {
        cors: {
            origin: ['http://localhost:5173', 'http://roje6147.odns.fr'], // Adresses du frontend
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        }
    });
    io.on('connection', socket => {
        console.log('Un utilisateur est connecté');

        socket.on('message', (message) => {
            console.log('Message reçu:', message);
            socket.broadcast.emit('message', message);
        });

        socket.on('disconnect', () => {
            console.log('utilisateur déconnecté');
        });
    });

    return io;
}

export default setupSocket;
