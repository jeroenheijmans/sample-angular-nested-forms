import { Component, Input, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { disallowJustWhitespace } from './no-whitespace.validator';
import { takeUntil } from 'rxjs/operators';
import { pizzaStyles } from './pizza-styles.model';
import { BaseDisposableComponent } from './base-disposable.component';

@Component({
  selector: 'app-pizza-form',
  template: `
    <h3>Title</h3>
    <div [formGroup]="menuInfo" class="p-10">
      <label>Name your pizza:</label>
      <input type="text" formControlName="title">
      <p *appValidationMessageFor="title">Title of at least 3 characters is required.</p>
    </div>
    <h3>Style</h3>
    <app-pizza-form-style [parent]="menuInfo"></app-pizza-form-style>
    <app-pizza-toppings [parent]="menuInfo" [toppingCountSuggestion]="toppingCountSuggestion">
    </app-pizza-toppings>
  `,
  styles: []
})
export class PizzaFormComponent extends BaseDisposableComponent implements AfterViewInit {
  title = new FormControl('', [Validators.required, Validators.minLength(3), disallowJustWhitespace]);

  menuInfo = new FormGroup({
    title: this.title,
  });

  toppingCountSuggestion: number | null = null;

  @Input() set parent(val: FormGroup) {
    val.addControl('menuInfo', this.menuInfo);
  }

  ngAfterViewInit() {
    this.menuInfo.get('styleInfo.style')?.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(v => {
        const style = pizzaStyles.find(s => s.id === v);
        this.toppingCountSuggestion = style ? style.toppingCountSuggestion : null;
      });
  }
}
