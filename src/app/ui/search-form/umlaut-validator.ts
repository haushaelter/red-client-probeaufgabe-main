import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UmlautValidator {
  static containUmlaut(control: AbstractControl): ValidationErrors | null {
    const text = String(control.value).toLowerCase();

    if (text.indexOf('ä') >= 0) {
      return { containUmlaut: true };
    }

    if (text.indexOf('ü') >= 0) {
      return { containUmlaut: true };
    }

    if (text.indexOf('ö') >= 0) {
      return { containUmlaut: true };
    }
  }
}
