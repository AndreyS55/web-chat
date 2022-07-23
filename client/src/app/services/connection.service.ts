import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Subject } from 'rxjs';
import { ClientEvent, ServerEvent } from '../types/Event';

type Message = {
  text: string;
  userId: string;
  date: Date;
};

@Injectable()
export class ConnectionService {
  private connection: Socket;
  private readonly dataStream: {
    [event in ServerEvent]: Subject<any> | BehaviorSubject<any>;
  } = {
    connect: new Subject(),
    token: new Subject<string>(),
    users: new BehaviorSubject<string[]>([]),
    messages: new BehaviorSubject<Message[]>([]),
  };

  connect$ = this.dataStream.connect;
  token$ = this.dataStream.token as Subject<string>;
  users$ = this.dataStream.users as BehaviorSubject<string[]>;
  messages$ = this.dataStream.messages as BehaviorSubject<Message[]>;

  constructor() {
    this.connection = io('localhost:5000');
    this.registerEvents();
  }

  emit(event: ClientEvent, data: any) {
    this.connection.emit(event, data);
  }

  addMessage(message: Message) {
    this.emit('message', message);
    this.messages$.next([...this.messages$.getValue(), message]);
  }

  private registerEvents() {
    this.registerEvent('connect');
    this.registerEvent('token');
    this.registerEvent('users');
    this.registerEvent('messages');
  }

  private registerEvent<T>(event: ServerEvent) {
    this.connection.on(event, (data: T) => {
      this.dataStream[event].next(data);
    });
  }
}
