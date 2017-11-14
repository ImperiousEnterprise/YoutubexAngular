import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {YoutubeService} from './youtube.service';
import { HttpClientModule } from '@angular/common/http';
import {ResizeService} from './resize.service';
import { PaginationComponent } from './pagination/pagination.component';
import { ShowvideoComponent } from './showvideo/showvideo.component';
import { ShowcommentComponent } from './showcomment/showcomment.component';
import {TimeAgoPipe} from './pipes/time-ago-pipe';
import {MatAutocompleteModule, MatIconModule, MatInputModule} from '@angular/material';
import {ReadMoreComponent} from './showcomment/readmore.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    ShowvideoComponent,
    ShowcommentComponent,
    TimeAgoPipe,
    ReadMoreComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [YoutubeService, ResizeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
