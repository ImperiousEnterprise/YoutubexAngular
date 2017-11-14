export class YoutubeSearchObject {
  public etag: string;
  public nextPageToken: string;
  public prevPageToken: string;
  public total: number;
  public items: Item[];
}

export class Item {
  public id: string;
  public title: string;
  public publshedAt: Date;
  public pic: {};

  constructor(id: string, title: string, publishedAt: Date, pic: {}) {
    this.id = id;
    this.title = title;
    this.publshedAt = publishedAt;
    this.pic = pic;
  }
}

export class Pic {
  public url: string;
  public height: number;
  public width: number;

  constructor(url: string, height: number, width: number) {
    this.url = url;
    this.height = height;
    this.width = width;
  }
}
