import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormArray,
  FormGroup,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';
import { v4 } from 'uuid';

export const CHECKBOX_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxGroupComponent),
  multi: true,
};

@Component({
  selector: 'app-checkbox-group',
  template: `
    <fieldset
      *ngIf="checkboxFormGroup"
      [id]="id"
      [formGroup]="checkboxFormGroup"
    >
      <legend>{{ legend }}</legend>
      <ng-container *ngFor="let control of arrayControls ?? []; let i = index">
        <app-checkbox
          [formControl]="control"
          [name]="arrayControls[i].value.name"
          [id]="arrayControls[i].value.id"
          >{{ "arrayControls[i].value.label }}</app-checkbox
        >
      </ng-container>
    </fieldset>
  `,
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [CHECKBOX_GROUP_CONTROL_VALUE_ACCESSOR],
})
export class CheckboxGroupComponent implements OnInit, ControlValueAccessor {
  @Input() id?: string;
  @Input() legend!: string;

  public checkboxFormGroup!: FormGroup;

  onChange = (...params: any[]) => {};
  onTouched = (...params: any[]) => {};

  constructor(private controlContainer: ControlContainer) {}

  get arrayControls(): FormControl[] | null {
    const formArrayKey: string = Object.keys(
      this.checkboxFormGroup.controls
    )[0];
    const formArray = this.checkboxFormGroup.get(formArrayKey) as FormArray;

    if (formArray) {
      return formArray.controls as FormControl[];
    }
    return null;
  }

  writeValue(values: boolean[]): void {
    // reduce to only keys of checked values
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.id = this.id ?? v4();
    this.checkboxFormGroup = this.controlContainer.control as FormGroup;
    console.log(this.arrayControls);
  }
}
