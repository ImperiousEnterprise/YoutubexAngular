import {
  Component, Input, ElementRef, AfterViewInit, OnInit, OnChanges, AfterContentChecked,
  AfterViewChecked, ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-read-more',
  template: `
        <div [ngClass]="{'p-0' : true,  'ml-0' : true, 'collapsed' : isCollapsed }" [innerHTML]="text" [style.height]="isCollapsed ? maxHeight+'px' : 'auto'">
        </div>
            <a class="readmore" *ngIf="isCollapsable" (click)="isCollapsed =! isCollapsed">Read {{isCollapsed? 'more':'less'}}</a>
    `,
  styles: [`
        div.collapsed {
            overflow: hidden;
        }
        a.readmore{
          font-weight: bold;,
          color: black;
        }
    `]
})
export class ReadMoreComponent implements AfterViewInit {
  @Input() text: string;
  @Input() maxHeight = 200;
  public isCollapsed = false;
  public isCollapsable = false;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    let currentHeight = this.elementRef.nativeElement.getElementsByTagName('div')[0].offsetHeight;
    // console.log('current height :' + currentHeight);
    // console.log('current max height: ' + this.maxHeight);
    if (currentHeight > this.maxHeight) {
      this.isCollapsed = true;
      this.isCollapsable = true;
    }
  }
}
