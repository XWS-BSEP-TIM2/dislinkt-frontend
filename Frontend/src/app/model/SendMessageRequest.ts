export class SendMessageRequest {
    constructor(
        public msgID: string = '',
        public authorUserID: string = '',
        public receiverUserID: string = '',
        public text: string = '',
        //public date: Date = new Date(),
    ) { }
  }
  