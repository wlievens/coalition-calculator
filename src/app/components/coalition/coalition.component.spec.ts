import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CoalitionComponent} from './coalition.component';

describe('CoalitionComponent', () => {
  let component: CoalitionComponent;
  let fixture: ComponentFixture<CoalitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoalitionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoalitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
