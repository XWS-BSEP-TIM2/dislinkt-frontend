import { Message } from "./Message";

export class ChatPreview {
    constructor(
        public msgID: string = '',
        public userID: string = '',
        public fullNameUser: string = '',
        public lastMessage: Message = new Message("","",{"seconds":0}),
        public numOfNewMessages: number = 0,
    ) {}
  }
  