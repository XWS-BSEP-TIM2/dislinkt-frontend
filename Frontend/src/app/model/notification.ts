import { CreationTime } from './post';

export class NotificationModel {
  constructor(
    public ownerId: string = '',
    public userFullName: string = '',
    public forwardUrl: string = '',
    public text: string = '',
    public date: CreationTime = new CreationTime(),
    public dateDisplay: Date = new Date(),
    public seen: boolean = true
  ) {}
}
