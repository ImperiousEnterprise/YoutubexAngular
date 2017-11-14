import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit,
  Renderer
} from '@angular/core';
import {Comment} from '../models/youtube-comment-object';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-showcomment',
  templateUrl: './showcomment.component.html',
  styleUrls: ['./showcomment.component.css'],
  animations: [
    trigger('collapse', [
      state('open', style({
        opacity: '1',
        display: 'initial',
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
export class ShowcommentComponent {
  @Input() Comments: Comment[];
  collapse = 'closed';
  selected: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
  }

  toggleCollapse(comment: Comment) {
// this.show = !this.show
    comment.collapse = comment.collapse === 'open' ? 'closed' : 'open';
  }
  /**
   ngAfterViewInit() {
    let currentHeight = this.elementRef.nativeElement.getElementsByTagName('div.readmoo')[0].offsetHeight;
    // console.log('current height :' + currentHeight);
    // console.log('current max height: ' + this.maxHeight);
    if (currentHeight > this.maxHeight) {
      this.isCollapsed = true;
      this.isCollapsable = true;
    }
  }**/

}
