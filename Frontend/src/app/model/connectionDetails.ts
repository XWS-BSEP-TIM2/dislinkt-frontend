import { Skill } from './skillModel';

export class ConnectionDetails {
  constructor(
    public UserID: string = '',
    public Name: string = '',
    public Surname: string = '',
    public Username: string = '',
    public Biography: string = '',
    public IsPrivate: boolean = false,
    public Skills: Skill[] = [],
  ) {}
}
