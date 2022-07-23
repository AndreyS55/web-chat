import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

type Message = { text: string; userId: string; date: Date };

function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  const users = new Set<string>();
  const messages: Message[] = [];

  io.on('connection', (socket) => {
    socket.on('auth', (token: string) => {
      verify(token, 'super-secret-key', (err, decoded) => {
        let userId: string;
        if (err) {
          userId = socket.id;
          const authToken = sign({ id: socket.id }, 'super-secret-key');
          socket.emit('token', authToken);
        } else {
          userId = (decoded as JwtPayload).id as string;
        }
        addUser(userId);

        socket.broadcast.emit('users', [...users]);
        socket.emit('users', [...users]);
        socket.emit('messages', messages);

        socket.on('message', (message: Message) => {
          messages.push(message);
          socket.broadcast.emit('messages', messages);
        });

        socket.on('disconnect', () => {
          removeUser(userId);
          socket.emit('users', [...users]);
        });
      });
    });
  });

  function addUser(id: string) {
    if (!users.has(id)) {
      users.add(id);
    }
  }

  function removeUser(id: string) {
    if (users.has(id)) {
      users.delete(id);
    }
  }

  httpServer.listen(5000, () => {
    console.info(`
        #######################################
        Server listening on port: 5000
        #######################################
    `);
  });
}

startServer();

process
  .on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at Promise:', promise);
    console.error('Reason:', reason);
  })
  .on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err);
    process.exit(1);
  });
