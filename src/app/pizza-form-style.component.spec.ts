import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaFormStyleComponent } from './pizza-form-style.component';

describe('PizzaFormStyleComponent', () => {
  let component: PizzaFormStyleComponent;
  let fixture: ComponentFixture<PizzaFormStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaFormStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaFormStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
