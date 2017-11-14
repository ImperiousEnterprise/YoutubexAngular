///<reference path="../../node_modules/rxjs/add/operator/map.d.ts"/>
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Item, Pic, YoutubeSearchObject} from './models/youtube-search-object';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Comment, Author, YoutubeCommentObject} from './models/youtube-comment-object';

@Injectable()
export class YoutubeService {
  private search_path = 'https://www.googleapis.com/youtube/v3/search';
  private comment_path = 'https://www.googleapis.com/youtube/v3/commentThreads';
  private apikey = 'AIzaSyCsEfzwW_Y2LBgEdKnJ9QSZZPXxYEcD31g';
  public result: YoutubeSearchObject;
  public commentThread: YoutubeCommentObject;
  constructor(private http: HttpClient) {  }

  GetVideosBySearchTerm(searchterm: string): Observable<YoutubeSearchObject> {
    let params = this.GenerateHttpParams('25');
    params = params.append('q', searchterm);
    params = params.append('type', 'video');
    params = params.append('part', 'snippet');
    return this.http.get(this.search_path,  { params: params } )
      .map(data => this.result = { total: data['pageInfo']['totalResults'], etag: data['etag'],
        prevPageToken: null, nextPageToken: data['nextPageToken'], items: this.genereateItemsArray(data['items']) });
  }
  GetSearchTermsNextPage(token: string): Observable<YoutubeSearchObject> {
    let params = this.GenerateHttpParams('15');
    params = params.append('pageToken', token);
    params = params.append('type', 'video');
    params = params.append('part', 'snippet');
    return  this.http.get(this.search_path,  { params: params } )
      .map(data => this.result = {total: data['pageInfo']['totalResults'], prevPageToken: data['prevPageToken'], etag: data['etag']
        , nextPageToken: data['nextPageToken'], items: this.genereateItemsArray(data['items']) });
  }

  GenerateHttpParams(num: string): HttpParams {
    let params = new HttpParams();
    params = params.append('maxResults', num);
    params = params.append('key',  this.apikey);
    return params;
  }

  GetVideoComments(id: string, token: string, numberofPosts: string): Observable<YoutubeCommentObject> {
    let params = new HttpParams();
    // let params = this.GenerateHttpParams('50');
    if (numberofPosts !== '') {params = params.append('maxResults', numberofPosts); }
    params = params.append('part', 'snippet,replies');
    params = params.append('pageToken', token);
    params = params.append('videoId', id);
    params = params.append('key',  this.apikey);
    params = params.append('textFormat', 'html');
    return this.http.get(this.comment_path, { params: params})
      .map(data => this.commentThread = { etag: data['etag'], nextPageToken: data['nextPageToken'],
        prevPageToken: null, total: data['pageInfo']['totalResults'], comments: this.generateCommentsArray(data['items']) } );

  }
  generateCommentsArray(dataarray: any): Comment[] {
    let commentsList: Comment[] = [];

    for (let com of dataarray ) {
        let topcomment = this.generateComment(com['snippet']['topLevelComment'], null);

        if ( com['snippet']['totalReplyCount'] > 0) {
          let commentReply: Comment[] = [];
          for (let reply of com['replies']['comments']) {
            let replyComment = this.generateComment(reply, topcomment.id);
            commentReply.push(replyComment);
          }
          topcomment['children'] = commentReply;
        }
        commentsList.push(topcomment);
    }

    return commentsList;

  }

  private generateComment(comment: any, id: string): Comment {
    let commentMade: Comment = {id: comment['id'],
      text: comment['snippet']['textDisplay'],
      publishedAt: comment['snippet']['publishedAt'],
      updatedAt: comment['snippet']['updatedAt'],
      author: this.generateAuthor(comment['snippet']),
      parent: id,
      children: null,
      collapse: 'closed'};
    return commentMade;
  }
  private  generateAuthor(commentAuthor: any): Author {
    let author: Author = {name: commentAuthor['authorDisplayName'], profileImage: commentAuthor['authorProfileImageUrl'], channelUrl: commentAuthor['authorChannelUrl']};
    return author;
  }
  private genereateItemsArray(dataarray: any): Item[] {
    let itemlist: Item[] = [];
    for (let vids of dataarray){
      let photos = {};
        for (let vid in vids['snippet']['thumbnails']) {
          let v = vids['snippet']['thumbnails'][vid];
          photos[vid] = new Pic(v['url'], v['height'], v['width']);
        }
      itemlist.push(new Item(vids['id']['videoId'], vids['snippet']['title'], vids['snippet']['publishedAt'], photos));
    }
    return itemlist;
  }

}
