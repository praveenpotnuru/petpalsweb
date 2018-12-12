import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglepetComponent } from './singlepet.component';

describe('SinglepetComponent', () => {
  let component: SinglepetComponent;
  let fixture: ComponentFixture<SinglepetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglepetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglepetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
