export type ServerEvent =
  | "connect"
  | "token"
  | "users"
  | "messages";

export type ClientEvent =
  | "auth"
  | "message";
