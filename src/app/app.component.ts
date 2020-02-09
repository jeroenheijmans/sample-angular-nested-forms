import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Nested Forms Demo</h1>
    <p>Compose your own pizza!</p>
    <h2>Pizza Composition</h2>
    <div>
      <app-pizza-form></app-pizza-form>
    </div>
  `,
  styles: []
})
export class AppComponent {
}
