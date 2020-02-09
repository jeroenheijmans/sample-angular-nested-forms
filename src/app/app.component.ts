import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <h1>Nested Forms Demo</h1>
    <p>Compose your own pizza!</p>
    <h2>Pizza Composition</h2>
    <form (ngSubmit)="onSubmit()" [formGroup]="pizzaFormGroup">
      <app-pizza-form [parent]="this.pizzaFormGroup"></app-pizza-form>
      <p><button type="submit" [disabled]="!pizzaFormGroup.valid">Submit</button></p>
    </form>
  `,
  styles: []
})
export class AppComponent {
  pizzaFormGroup = new FormGroup({ });

  onSubmit() {
    console.log('submitting!');
  }
}
