import { AbstractControl } from "@angular/forms";

export function disallowJustWhitespace(control: AbstractControl) {
  return !control.value || !control.value.trim().length
    ? { 'must-have-non-whitespace': true }
    : null;
}
