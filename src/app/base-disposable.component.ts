import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class BaseDisposableComponent implements OnDestroy {
  destroyed$ = new Subject();

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
