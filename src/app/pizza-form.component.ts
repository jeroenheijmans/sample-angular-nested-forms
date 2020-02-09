import { Component, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { disallowJustWhitespace } from './no-whitespace.validator';

@Component({
  selector: 'app-pizza-form',
  template: `
    <div [formGroup]="menuInfo" class="p-10">
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
    title: new FormControl('', [Validators.required, Validators.minLength(3), disallowJustWhitespace]),
  });

  @Input() set parent(val: FormGroup) {
    val.addControl('menuInfo', this.menuInfo);
  }

}
