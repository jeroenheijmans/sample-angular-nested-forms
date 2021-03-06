import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { pizzaStyles } from './pizza-styles.model';
import { sauceChoiceRequiredValidator } from './sauce-choice-required.validator';
import { BaseDisposableComponent } from './base-disposable.component';

@Component({
  selector: 'app-pizza-form-style',
  template: `
    <div [formGroup]="styleInfo" class="p-10">
      <label>Base pie style:</label>
      <select formControlName="style">
        <option></option>
        <option *ngFor="let option of availableStyles" [value]="option.id">
          {{option.label}}
        </option>
      </select>
      <p *appValidationMessageFor="style">A pie without a pie is no pie. Please pick one!</p>
      <div *ngIf="showSauces">
        <p>Sauce:</p>
        <label *ngFor="let sauce of availableSauces">
          <input type="radio" formControlName="sauce" [value]="sauce.id">
          {{sauce.label}}
        </label>
        <p *appValidationMessageFor="styleInfo">Specifying sauce is required for the selected type of pie.</p>
      </div>
    </div>
  `,
  styles: []
})
export class PizzaFormStyleComponent extends BaseDisposableComponent implements OnInit {
  style = new FormControl('', [Validators.required]);
  sauce = new FormControl('', []);

  styleInfo = new FormGroup({
    style: this.style,
    sauce: this.sauce,
  }, {
    validators: [sauceChoiceRequiredValidator]
  });

  availableStyles = pizzaStyles;

  availableSauces = [
    { id: 'sauce-123', label: 'Tomato' },
    { id: 'sauce-456', label: 'Creme Fraiche' },
  ];

  showSauces?: boolean;

  @Input() set parent(val: FormGroup) {
    val.addControl('styleInfo', this.styleInfo);
  }

  ngOnInit(): void {
    this.styleInfo.get('style')?.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(v => this.showSauces = this.availableStyles.find(s => s.id === v)?.needsSauceChoice);
  }
}
