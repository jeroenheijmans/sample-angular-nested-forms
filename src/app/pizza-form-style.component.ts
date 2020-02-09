import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pizza-form-style',
  template: `
    <label>Base pie style</label>
    <select [formControl]="style">
      <option *ngFor="let option of availableStyles" [value]="option.id">
        {{option.label}}
      </option>
    </select>
  `,
  styles: []
})
export class PizzaFormStyleComponent implements OnInit {
  style = new FormControl();

  availableStyles = [
    { id: 0, label: 'Roman' },
    { id: 2, label: 'Neapolitan' },
    { id: 3, label: 'NY Style' },
    { id: 4, label: 'Chicago' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
