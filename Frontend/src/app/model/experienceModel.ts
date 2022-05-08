export class Experience {
  constructor(
    public id: string = '',
    public name: string = '',
    public experienceType: string = '',
    public description: string = '',
    public startDate: Date = new Date(),
    public endDate: Date = new Date()
  ) {}
}
