import { TestBed, inject } from '@angular/core/testing';

import { SuperadminLoginService } from './superadmin-login.service';

describe('SuperadminLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperadminLoginService]
    });
  });

  it('should be created', inject([SuperadminLoginService], (service: SuperadminLoginService) => {
    expect(service).toBeTruthy();
  }));
});
