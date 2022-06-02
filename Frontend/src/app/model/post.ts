import { Profile } from './profileModel';

export class Post {
  constructor(
    public owner: Profile = new Profile(),
    public creationTime: CreationTime = new CreationTime(),
    public content: string = '',
    public image_base64: string = '',
    public links: string[] = [],
    public hrefs: PostHref[] = [],
    public stats: any = null,
    public reactions: any = null,
    public timestamp: Date = new Date()
  ) {}
}

export class CreationTime {
  constructor(
    public seconds: number = 1654169029,
    public nanos: number = 973000000
  ) {}
}

export class PostHref {
  constructor(public url: string = '', public rel: string = '') {}
}

export class PostComment {
  constructor(
    public owner: Profile = new Profile(),
    public creationTime: CreationTime = new CreationTime(),
    public content: string = '',
    public hrefs: PostHref[] = []
  ) {}
}
