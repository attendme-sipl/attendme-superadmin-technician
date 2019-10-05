import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminLoginComponent } from './superadmin-login.component';

describe('SuperadminLoginComponent', () => {
  let component: SuperadminLoginComponent;
  let fixture: ComponentFixture<SuperadminLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperadminLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
