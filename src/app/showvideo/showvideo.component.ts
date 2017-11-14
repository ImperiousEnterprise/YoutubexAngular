import {Component, HostListener, Input, OnChanges} from '@angular/core';
import {YoutubeService} from '../youtube.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {YoutubeCommentObject, Comment} from '../models/youtube-comment-object';
import {MatIconRegistry} from '@angular/material';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-showvideo',
  templateUrl: './showvideo.component.html',
  styleUrls: ['./showvideo.component.css'],
  animations: [
    trigger('collapse', [
      state('open', style({
        opacity: '1',
        display: 'block',
        transform: 'translate3d(0, 0, 0)'
      })),
      state('closed',   style({
        opacity: '0',
        display: 'none',
        transform: 'translate3d(0, -100%, 0)'
      })),
      transition('closed => open', animate('200ms ease-in')),
      transition('open => closed', animate('100ms ease-out'))
    ])
  ]
})
export class ShowvideoComponent implements OnChanges {
  @Input() videoId: string;
  trustedUrl: SafeResourceUrl;
  VideoComments: YoutubeCommentObject;
  collapse = 'closed';

  constructor(private youtubeService: YoutubeService, private sanitize: DomSanitizer, private iconRegistry: MatIconRegistry) {
  }

  ngOnChanges() {
    this.displayVid();
    this.youtubeService.GetVideoComments(this.videoId, '', '20' ).subscribe(res => this.VideoComments = res);
  }
  displayVid() {
    const url = 'https://www.youtube.com/embed/' + this.videoId;
    this.trustedUrl = this.sanitize.bypassSecurityTrustResourceUrl(url);
  }

  onScrollDown() {
    this.youtubeService.GetVideoComments(this.videoId, this.VideoComments.nextPageToken, '20' ).subscribe(res => {
      if ( res.nextPageToken !== this.VideoComments.nextPageToken) {
        let combo = this.VideoComments.comments.concat(res.comments);
        res.comments = this.sortArrayAndReverse(combo);
        this.VideoComments = res;
      }
        });
  }
  sortArrayAndReverse(comments: Comment[]) {
    return comments.sort(function(comment1, comment2) {
      if ( comment1.updatedAt < comment2.updatedAt ) {
        return -1;
      }else if ( comment1.updatedAt > comment2.updatedAt ) {
        return 1;
      }else {
        return 0;
      }
    }).reverse();
  }

  toggleCollapse() {
// this.show = !this.show
    this.collapse = this.collapse === 'open' ? 'closed' : 'open';
  }
  /**
  onScrollUp() {
    console.log('UP AND AWAY');
    this.youtubeService.GetVideoComments(this.videoId, this.VideoComments.prevPageToken, '15' ).subscribe(res => { res.comments.concat(this.VideoComments.comments); this.VideoComments = res; } );
  }
   **/
  /**
  @HostListener('window:scroll', [])
  onScroll(): void {
    console.log('scrolled');
    console.log('window: ' + (window.innerHeight + window.scrollY));
    console.log('document: ' + document.body.offsetHeight);
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
      // you're at the bottom of the page
      setTimeout(this.onScrollDown(), 15000);
    }
  }**/

}
