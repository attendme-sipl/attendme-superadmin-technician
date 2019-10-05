import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminMainComponent } from './superadmin-main.component';

describe('SuperadminMainComponent', () => {
  let component: SuperadminMainComponent;
  let fixture: ComponentFixture<SuperadminMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperadminMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
