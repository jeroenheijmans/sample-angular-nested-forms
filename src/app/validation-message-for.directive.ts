import { Directive, TemplateRef, ViewContainerRef, Input, Renderer2, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { BaseDisposableComponent } from './base-disposable.component';

@Directive({
  selector: '[appValidationMessageFor]'
})
export class ValidationMessageForDirective extends BaseDisposableComponent {
  private hasView = false;

  @Input() set appValidationMessageFor(control: AbstractControl) {
    const updateView = () => {
      const showError = control.invalid && control.touched;

      if (showError && !this.hasView) {
        const embeddedView = this.viewContainer.createEmbeddedView(this.templateRef);
        const elementRef = embeddedView.rootNodes[0] as ElementRef;
        this.renderer.addClass(elementRef, 'validation-error');
        this.hasView = true;
      } else if (!showError && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    };

    // TODO: Determine if this doesn't create funky side effects...
    const originalFn = control.markAsTouched;
    control.markAsTouched = options => {
      originalFn.call(control, options);
      updateView();
    };

    control.statusChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => updateView());
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2,
  ) {
    super();
  }

}
