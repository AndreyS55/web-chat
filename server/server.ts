import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from './src/config';
import { connectionHandler } from "./src/handlers";

function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', connectionHandler);

  httpServer.listen(config.port, () => {
    console.info(`
        #######################################
        Server listening on port: ${config.port}
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
