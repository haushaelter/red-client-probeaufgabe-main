import { AbstractControl, ValidationErrors } from '@angular/forms';

export class WhiteSpaceValidator {
  static containWhiteSpace(control: AbstractControl): ValidationErrors | null {
    const text = String(control.value);

    if (text.indexOf(' ') >= 0) {
      return { containWhiteSpace: true };
    }
  }
}
