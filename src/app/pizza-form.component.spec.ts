import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaFormComponent } from './pizza-form.component';

describe('PizzaFormComponent', () => {
  let component: PizzaFormComponent;
  let fixture: ComponentFixture<PizzaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
