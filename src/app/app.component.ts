import { Component, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <h1>Nested Forms Demo</h1>
    <div class="split">
      <div>
        <h2>Pizza Composition</h2>
        <p>Compose your own pizza!</p>
        <form (ngSubmit)="onSubmit()" [formGroup]="pizzaFormGroup" class="p-10">
          <app-pizza-form [parent]="pizzaFormGroup"></app-pizza-form>
          <p><button type="submit" [disabled]="!pizzaFormGroup.valid">Submit</button></p>
        </form>
      </div>
      <div>
        <h2>Debug info</h2>
        <p>Values:</p>
        <pre>{{formval | json}}</pre>
        <p>Errors:</p>
        <pre>{{errors | json}}</pre>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent implements AfterViewChecked, OnDestroy {
  destroyed$ = new Subject();
  pizzaFormGroup = new FormGroup({ });
  formval = null;
  errors = null;

  onSubmit() {
    console.log('submitting!');
  }

  ngAfterViewChecked() {
    this.pizzaFormGroup.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(v => this.formval = v);

    this.pizzaFormGroup.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => this.errors = this.getErrors(this.pizzaFormGroup));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private getErrors(control: FormGroup) {
    const result: any = { };

    if (control.errors) {
      result.__errors = control.errors
    }

    Object.keys(control.controls).forEach(k => {
      const item = control.get(k);
      if (item instanceof FormGroup) {
        result[k] = this.getErrors(item);
      } else {
        result[k] = item?.errors;
      }
    });

    return result;
  }
}
