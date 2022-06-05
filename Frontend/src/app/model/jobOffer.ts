export class JobOffer {
  constructor(
    public id: string = '',
    public companyName: string = '',
    public forwardUrl: string = '', // Is empty if the job offer is from Dislinkt and not Agents
    public userId: string = '', // Is empty if the job offer is from Dislinkt
    public position: string = '',
    public seniority: string = '',
    public description: string = '',
    public jobOfferUniqueCode: string = '',
    public technologies: string[] = []
  ) {}
}
