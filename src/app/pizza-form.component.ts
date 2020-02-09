import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pizza-form',
  template: `
    <label>Title for your pizza:</label>
    <input type="text" [formControl]="title">
    <h3>Style</h3>
    <app-pizza-form-style></app-pizza-form-style>
  `,
  styles: []
})
export class PizzaFormComponent implements OnInit {
  title = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

}
