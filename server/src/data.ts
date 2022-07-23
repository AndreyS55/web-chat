import { Message } from "./types";

class Store {
  private users = new Set<string>();
  private messages: Message[] = [];

  getUsers = () => this.users;
  getMessages = () => this.messages;

  addUser = (id: string) => {
    if (!this.users.has(id)) {
      this.users.add(id);
    }
  };

  removeUser = (id: string) => {
    if (this.users.has(id)) {
      this.users.delete(id);
    }
  };

  addMessage = (message: Message) => {
    this.messages.push(message);
  };
}

export default new Store();
