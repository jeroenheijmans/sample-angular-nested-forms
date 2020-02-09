import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
      <div *ngIf="showSauces">
        <label *ngFor="let sauce of availableSauces">
          <input type="radio" formControlName="sauce" [value]="sauce.id">
          {{sauce.label}}
        </label>
      </div>
    </div>
  `,
  styles: []
})
export class PizzaFormStyleComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();

  styleInfo = new FormGroup({
    style: new FormControl('', [Validators.required]),
    sauce: new FormControl('', [Validators.required]),
  });

  availableStyles = [
    { id: 'style-1', needsSauceChoice: true, label: 'Roman' },
    { id: 'style-2', needsSauceChoice: true, label: 'Neapolitan' },
    { id: 'style-3', needsSauceChoice: true, label: 'NY Style' },
    { id: 'style-4', needsSauceChoice: false, label: 'Chicago Deep Dish' },
  ];

  availableSauces = [
    { id: 'sauce-123', label: 'Tomato' },
    { id: 'sauce-456', label: 'Creme Fraiche' },
  ];

  showSauces?: boolean;

  @Input() set parent(val: FormGroup) {
    val.addControl('pizzaTitle', this.styleInfo);
  }

  ngOnInit(): void {
    this.styleInfo.get('style')?.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(v => this.showSauces = this.availableStyles.find(s => s.id === v)?.needsSauceChoice);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
