import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { BaseDisposableComponent } from './base-disposable.component';

@Component({
  selector: 'app-pizza-delivery-tips',
  template: `
    <div class="p-10" [formGroup]="deliveryTips">
      <p>Will you tip for following delivery instructions?</p>
      <label>
        <input type="checkbox" formControlName="willTip">
        Yes, I will tip for that!
      </label>
      <p>
        Add your delivery instructions:
      </p>
      <textarea [required]="instructionsRequired" formControlName="instructions"></textarea>
      <span style="color: red;" *ngIf="instructions.errors?.required">You really have to provide instructions if you say you'd tip to have them followed...</span>
    </div>
  `,
  styles: ['textarea { width: 100%; height: 5em; }']
})
export class PizzaDeliveryTipsComponent extends BaseDisposableComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  _instructionsRequired = false;
  set instructionsRequired(val: boolean) {
    if (val !== this._instructionsRequired) {
      this._instructionsRequired = val;

      // If this setter was called as a result from change detection, we
      // need to explicitly inform angular that if leads to _another_ set
      // of changes it may need to detect.
      // See also: https://github.com/angular/angular/issues/23657
      this.cdRef.detectChanges();
    }
  }
  get instructionsRequired(): boolean {
    return this._instructionsRequired;
  }

  willTip = new FormControl('', []);
  instructions = new FormControl('', []);

  deliveryTips = new FormGroup({
    willTip: this.willTip,
    instructions: this.instructions,
  });

  @Input() set parent(val: FormGroup) {
    val.addControl('deliveryTips', this.deliveryTips);
  }

  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.willTip.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => this.instructionsRequired = value);
  }
}
