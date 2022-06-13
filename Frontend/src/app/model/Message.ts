export class Message {
    constructor(
        public authorUserID: string = '',
        public text: string = '',
        public date: any,
    ) { }
    
    getDate(): Date {
        return new Date(this.date.seconds * 1000)
    }

  }
  