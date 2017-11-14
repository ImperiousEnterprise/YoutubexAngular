export class YoutubeCommentObject {
  public etag: string;
  public nextPageToken: string;
  public prevPageToken: string;
  public total: number;
  public comments: Comment[];
}

export class Comment {
  id: string;
  author: Author;
  publishedAt: Date;
  updatedAt: Date;
  text: string;
  parent: string;
  children: Comment[];
  collapse: string;
}

export class Author {
  name: string;
  profileImage: string;
  channelUrl: string;
}
