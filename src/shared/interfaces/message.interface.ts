import { IChat } from "./chat.interface";

export interface IMessage {
    id: number;
    text: string;
    date: string;
    my: boolean;
    chatId: number;
    chat: IChat;
  }