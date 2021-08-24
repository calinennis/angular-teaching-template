import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { v4 } from 'uuid';


@Component({
  selector: 'app-checkbox',
  template: `
    <label [attr.for]="id">
      <span
        class="checkbox"
        [class.checkbox--checked]="checked"
        [class.checkbox--error]="hasError()"
      >
        <input
          #checkbox
          type="checkbox"
          [attr.name]="name"
          [attr.id]="id"
          [attr.disabled]="disabled"
          [checked]="checked"
          [required]="required"
          (change)="onInteraction($event)"
          (click)="onClick($event)"
          (blur)="onBlur()"
        />
      </span>
      <ng-content></ng-content>
    </label>
  `,
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  @Input() checked!: boolean;
  @Input() id?: string;
  @Input() name?: string;
  @Input() disabled?: boolean;
  @Input() required?: boolean;

  @Output() readonly valueChanged: EventEmitter<boolean> = new EventEmitter();

  formControl?: FormControl;
  onChange = (...params: any[]) => {};
  onTouched = (...params: any[]) => {};

  // tslint:disable-next-line:variable-name
  constructor(@Optional() @Self() private _ngControl: NgControl) {
    if (this._ngControl) {
      this._ngControl.valueAccessor = this;
    }
  }

  writeValue(value: boolean): void {
    this.checked = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(value: boolean): void {
    this.disabled = value;
  }

  ngOnInit(): void {
    if (this._ngControl) {
      this.formControl = this._ngControl.control as FormControl;
    }
    this.id = this.id ?? v4();
  }

  onClick(event: Event): void {
    event.stopPropagation();
    this.checked = !this.checked;
    this.onChange(this.checked);
  }

  onInteraction(event: Event): void {
    // ensure we stop native events bubbling up and duplicating
    event.stopPropagation();
  }

  onBlur(): void {
    this.onTouched();
  }

  hasError(): boolean | undefined {
    return (this.formControl?.valid && this.formControl?.touched) ?? false;
  }
}
