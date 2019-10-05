import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLegalEntityComponent } from './add-legal-entity.component';

describe('AddLegalEntityComponent', () => {
  let component: AddLegalEntityComponent;
  let fixture: ComponentFixture<AddLegalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLegalEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
