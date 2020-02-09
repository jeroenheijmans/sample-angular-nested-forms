import { Component, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pizza-form-style',
  template: `
    <div [formGroup]="styleInfo">
      <label>Base pie style</label>
      <select formControlName="style">
        <option></option>
        <option *ngFor="let option of availableStyles" [value]="option.id">
          {{option.label}}
        </option>
      </select>
    </div>
  `,
  styles: []
})
export class PizzaFormStyleComponent {
  styleInfo = new FormGroup({
    style: new FormControl('', [Validators.required]),
  });

  availableStyles = [
    { id: 0, label: 'Roman' },
    { id: 2, label: 'Neapolitan' },
    { id: 3, label: 'NY Style' },
    { id: 4, label: 'Chicago' },
  ];

  @Input() set parent(val: FormGroup) {
    val.addControl('pizzaTitle', this.styleInfo);
  }
}
