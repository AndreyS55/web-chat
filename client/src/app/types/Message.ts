export type Message = {
  text: string;
  userId: string;
  date: Date;
};

export type ColoredMessage = Message & {
  color: string;
};
