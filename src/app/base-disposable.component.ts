import { OnDestroy, Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({ template: '' })
export abstract class BaseDisposableComponent implements OnDestroy {
  destroyed$ = new Subject();

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
