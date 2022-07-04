import { CreationTime } from './post';

export class EventModel {
  constructor(
    public userId: string = '',
    public title: string = '',
    public description: string = '',
    public date: CreationTime = new CreationTime(),
    public dateDisplay: Date = new Date()
  ) {}
}
