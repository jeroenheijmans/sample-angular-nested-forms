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
        <p>Compose your own pizza!</p>
        <h2>Pizza Composition</h2>
        <form (ngSubmit)="onSubmit()" [formGroup]="pizzaFormGroup" class="p-10">
          <app-pizza-form [parent]="pizzaFormGroup"></app-pizza-form>
          <p><button type="submit" [disabled]="!pizzaFormGroup.valid">Submit</button></p>
        </form>
      </div>
      <pre>{{formval | json}}</pre>
    </div>
  `,
  styles: []
})
export class AppComponent implements AfterViewChecked, OnDestroy {
  destroyed$ = new Subject();
  pizzaFormGroup = new FormGroup({ });
  formval = null;

  onSubmit() {
    console.log('submitting!');
  }

  ngAfterViewChecked() {
    this.pizzaFormGroup.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(v => this.formval = v);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
