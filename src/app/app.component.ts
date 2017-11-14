import {AfterViewChecked, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {YoutubeService} from './youtube.service';
import {YoutubeSearchObject} from './models/youtube-search-object';
import {ShowvideoComponent} from './showvideo/showvideo.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, AfterViewChecked {

  title = 'app';
  result: YoutubeSearchObject;
  youtubeService: YoutubeService;
  width: number;
  vidId: string;
  total: number;
  myControl: FormControl;
  searchTitles: string[];
  filteredOptions: Observable<string[]>;

  @ViewChild('childComponent') childComponent;

  constructor(youtubeService: YoutubeService, private cd: ChangeDetectorRef) {
    this.youtubeService = youtubeService;
  }
  ngAfterViewChecked() {
      this.cd.detectChanges();
  }

  ngOnInit() {
    this.youtubeService.GetVideosBySearchTerm('').subscribe(results => {
      this.result = results;
      this.vidId = this.result.items[0].id;
      this.searchTitles = results.items.map(item => item.title);
    });
    this.myControl = new FormControl();
    this.filteredOptions = this.myControl.valueChanges
      .startWith('')
      .map(val => this.filter(val));
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = event.target.innerWidth;
    // console.log(event.target.innerWidth);
  }

  showVid(id) {
    this.vidId = id;
  }
  onScrollDown() {
    this.youtubeService.GetSearchTermsNextPage(this.result.nextPageToken).subscribe(results => {
      if (results.nextPageToken !== this.result.nextPageToken) {
        let combo = this.result.items.concat(results.items);
        results.items = combo;
        this.result = results;
        // console.log(this.result);
      }
       });
  }
  onScrollLoadComments() {
    // this.childComponent.onScrollDown();
    this.youtubeService.GetVideoComments(this.vidId,  this.childComponent.VideoComments.nextPageToken, '20' ).subscribe(res => {
      if ( res.nextPageToken !==  this.childComponent.VideoComments.nextPageToken) {
        let combo =  this.childComponent.VideoComments.comments.concat(res.comments);
        res.comments = combo;
        this.childComponent.VideoComments = res;
      }
    });
  }

  autoCompleteSearchs(event: any) {
    this.youtubeService.GetVideosBySearchTerm(event.target.value).subscribe(results => { this.searchTitles = results.items.map(item => item.title); });
  }

  selectVideoList(videoList) {
    this.youtubeService.GetVideosBySearchTerm(videoList).subscribe(results => { this.result = results;});
  }

  filter(val: string): string[] {
    return this.searchTitles.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}
