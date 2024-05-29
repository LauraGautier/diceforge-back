import { Server as WebsocketServer } from "socket.io";

function setupSocket(httpServer) {
    const io = new WebsocketServer(httpServer);
    
    io.on('connection', socket => {
        console.log('Un client est connecté');

        socket.on('message', (message) => {
            console.log('Message reçu:', message);
            socket.broadcast.emit('message', message);
        });

        socket.on('disconnect', () => {
            console.log('Client déconnecté');
        });

        // Vous pouvez ajouter d'autres écouteurs d'événements ici
    });

    return io;
}

export default setupSocket;
