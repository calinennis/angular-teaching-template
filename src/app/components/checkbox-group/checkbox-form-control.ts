import { AbstractControlOptions } from '@angular/forms';

export interface CheckboxFormControl {
  checked: boolean;
  disabled?: boolean;
  label?: string;
  id?: string;
  name?: string;
  validatorOptions?: AbstractControlOptions;
}
