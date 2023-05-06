import { TestBed } from '@angular/core/testing';

import { FeedComponentServiceService } from './feed-component-service.service';

describe('FeedComponentServiceService', () => {
  let service: FeedComponentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedComponentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
