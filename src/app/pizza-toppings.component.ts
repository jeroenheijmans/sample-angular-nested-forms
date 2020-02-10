import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { pizzaToppings } from './pizza-toppings.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
        That means you're now <strong>overloading your pie</strong> at your own risk! :D
      </p>
    </div>
  `,
  styles: []
})
export class PizzaToppingsComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();

  showToppingCountWarning = false;
  availableToppings = pizzaToppings;

  toppings = new FormControl('', []);

  @Input() set parent(val: FormGroup) {
    val.addControl('toppings', this.toppings);
  }

  @Input() toppingCountSuggestion: number;

  ngOnInit() {
    this.toppings.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(v => this.showToppingCountWarning = v.length > this.toppingCountSuggestion);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
