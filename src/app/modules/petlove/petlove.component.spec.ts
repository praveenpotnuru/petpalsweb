import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetloveComponent } from './petlove.component';

describe('PetloveComponent', () => {
  let component: PetloveComponent;
  let fixture: ComponentFixture<PetloveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetloveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetloveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
