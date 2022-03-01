import { TestBed } from '@angular/core/testing';

import { MyadsService } from './myads.service';

describe('MyadsService', () => {
  let service: MyadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
