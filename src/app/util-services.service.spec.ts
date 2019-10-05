import { TestBed, inject } from '@angular/core/testing';

import { UtilServicesService } from './util-services.service';

describe('UtilServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilServicesService]
    });
  });

  it('should be created', inject([UtilServicesService], (service: UtilServicesService) => {
    expect(service).toBeTruthy();
  }));
});
