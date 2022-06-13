import { Message } from "./Message";

export class Chat {
    constructor(
        public msgID: string = '',

        public userIDa: string = '',
        public fullNameUserA: string = '',
        public userASeenDate: any = {},

        public userIDb: string = '',
        public fullNameUserB: string = '',
        public userBSeenDate: any = {},

        public messages: Message[] = [],
    ) { }
    
    getUserASeenDate(): Date {
        return new Date(this.userASeenDate.seconds * 1000)
    }

    getUserBSeenDate(): Date {
        return new Date(this.userBSeenDate.seconds * 1000)
    }
  }
  