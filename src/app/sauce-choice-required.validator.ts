import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { pizzaStyles } from './pizza-styles.model';

export const sauceChoiceRequiredValidator: ValidatorFn
  = (control: FormGroup): ValidationErrors | null => {
    const styleId = control.get('style')?.value;
    const style = pizzaStyles.find(s => s.id === styleId);
    const sauce = control.get('sauce')?.value;

    return !style || style?.needsSauceChoice === false || sauce
      ? null
      : { 'needsSauceChoice': true };
}
