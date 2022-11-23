import { IMessage } from "./message.interface";
import { IUser } from "./user.interface";

export interface IChat {
    id: number,
    firstUser: IUser,
    secondUser: IUser,
    lastMessage: IMessage
  }