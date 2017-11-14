import { TestBed, inject } from '@angular/core/testing';

import { YoutubeService } from './youtube.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('YoutubeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [YoutubeService]
    });
  });

  it('should be created', inject([YoutubeService], (service: YoutubeService) => {
    expect(service).toBeTruthy();
  }));
  it('gets search data', inject([YoutubeService], (service: YoutubeService) => {
    let data = service.GetVideosBySearchTerm('cats');
    expect(data).not.toBeNull();
  }));
  it('does blank search', inject([YoutubeService], (service: YoutubeService) => {
    let data = service.GetVideosBySearchTerm('');
    expect(data).not.toBeNull();
  }));
});
