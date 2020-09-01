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
    </div>
  `,
  styles: ['textarea { width: 100%; height: 5em; }']
})
export class PizzaDeliveryTipsComponent extends BaseDisposableComponent implements OnInit {
  instructionsRequired = false;

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
      .subscribe(value => {
        this.instructionsRequired = value;

        // Only needed because we *display* (for debugging purposes)
        // the validation results, and changing above boolean changes
        // the validators because it changes [required] on another
        // form control. So we tell angular about that:
        this.cdRef.detectChanges();
      });
  }
}
