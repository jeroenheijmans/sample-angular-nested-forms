import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { pizzaToppings } from './pizza-toppings.model';
import { takeUntil } from 'rxjs/operators';
import { BaseDisposableComponent } from './base-disposable.component';

@Component({
  selector: 'app-pizza-toppings',
  template: `
    <div class="p-10">
      <p>Select zero or more toppings:</p>
      <select multiple [formControl]="toppings">
        <option *ngFor="let option of availableToppings" [value]="option.id">
          {{option.label}}
        </option>
      </select>
      <p class="warning" *ngIf="toppingCountSuggestion">
        Your selected pie style is enjoyed best with no more than
        <strong>{{toppingCountSuggestion}}</strong>
        toppings.
      </p>
      <p class="warning" *ngIf="showToppingCountWarning">
        ⚠ That means you're now <strong>overloading your pie</strong> at your own risk! :D
      </p>
    </div>
  `,
  styles: []
})
export class PizzaToppingsComponent extends BaseDisposableComponent implements OnInit {
  showToppingCountWarning = false;
  availableToppings = pizzaToppings;
  toppings = new FormControl('', []);

  @Input() set parent(val: FormGroup) {
    val.addControl('toppings', this.toppings);
  }

  // tslint:disable-next-line: variable-name
  private _toppingCountSuggestion: number | null;
  @Input() set toppingCountSuggestion(val: number | null) {
    this._toppingCountSuggestion = val;
    this.resetWarning();
  }
  get toppingCountSuggestion() {
    return this._toppingCountSuggestion;
  }

  ngOnInit() {
    this.toppings.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => this.resetWarning());
  }

  resetWarning() {
    const selecteds = this.toppings.value as string[];
    this.showToppingCountWarning = this.toppingCountSuggestion !== null
      && selecteds
      && selecteds.length > this.toppingCountSuggestion;
  }
}
