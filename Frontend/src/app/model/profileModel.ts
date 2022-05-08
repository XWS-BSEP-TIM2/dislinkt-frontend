import { Experience } from './experienceModel';
import { Skill } from './skillModel';

export class Profile {
  constructor(
    public id: string = '',
    public name: string = '',
    public surname: string = '',
    public username: string = '',
    public email: string = '',
    public biography: string = '',
    public gender: string = '',
    public phoneNumber: string = '',
    public birthDate: Date = new Date(),
    public isPrivate: boolean = false,
    public skills: Skill[] = [],
    public experiences: Experience[] = [],
    public fullName: string = ''
  ) {}
}
