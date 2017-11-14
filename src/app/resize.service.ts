import { EventManager } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';

@Injectable()
export class ResizeService {

  get onResize$(): Observable<Window> {
    return this.resizeSubject.asObservable().filter(_ => !_);
  }

  private resizeSubject: Subject<Window>;

  constructor(private eventManager: EventManager) {
    this.resizeSubject = new Subject();
    this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
  }

  private onResize(event: UIEvent) {
    // console.log('Resize Service: ' + <Window>event.target);
    // console.log(event.view.innerWidth);
    // console.log('Resize Service: ' + this.resizeSubject.next(<Window>event.target));
  }
}
