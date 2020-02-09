import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pizza-form',
  template: `
    <div [formGroup]="menuInfo">
      <label>Title for your pizza:</label>
      <input type="text" formControlName="title">
    </div>
    <h3>Style</h3>
    <app-pizza-form-style [parent]="menuInfo"></app-pizza-form-style>
  `,
  styles: []
})
export class PizzaFormComponent {
  menuInfo = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  @Input() set parent(val: FormGroup) {
    val.addControl('pizzaTitle', this.menuInfo);
  }

}
