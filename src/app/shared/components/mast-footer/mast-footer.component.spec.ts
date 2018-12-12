import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastFooterComponent } from './mast-footer.component';

describe('MastFooterComponent', () => {
  let component: MastFooterComponent;
  let fixture: ComponentFixture<MastFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
