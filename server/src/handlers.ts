import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { config } from './config';
import { Message } from './types';
import DataStore from './data';

export const connectionHandler = (socket: Socket) => {
  socket.on('auth', authHandler(socket));
};

const authHandler = (socket: Socket) => (token: string) => {
  verify(token, config.key, (err, decoded) => {
    let userId: string;
    if (err) {
      userId = socket.id;
      const authToken = sign({ id: socket.id }, config.key);
      socket.emit('token', authToken);
    } else {
      userId = (decoded as JwtPayload).id as string;
    }
    DataStore.addUser(userId);

    socket.broadcast.emit('users', [...DataStore.getUsers()]);
    socket.emit('users', [...DataStore.getUsers()]);
    socket.emit('messages', DataStore.getMessages());

    socket.on('message', messageHandler(socket));
    socket.on('disconnect', disconnectHandler(socket, userId));
  });
};

const messageHandler = (socket: Socket) => (message: Message) => {
  DataStore.addMessage(message);
  socket.broadcast.emit('messages', DataStore.getMessages());
};

const disconnectHandler = (socket: Socket, id: string) => () => {
  DataStore.removeUser(id);
  socket.emit('users', [...DataStore.getUsers()]);
};
