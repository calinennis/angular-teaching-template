import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckboxFormControl } from './components/checkbox-group/checkbox-form-control';

@Component({
  selector: 'app-root',
  template: `
    <div class="content">
      <form [formGroup]="exampleForm">
        <app-checkbox formControlName="singleCheckbox" name="single-checkbox"
          >Single Checkbox</app-checkbox
        >
      </form>

      <form [formGroup]="exampleTwo">
        <app-checkbox-group
          id="food-checkbox-group"
          legend="Pick Your Favorite Food!"
          [formGroup]="checkboxGroup"
        >
        </app-checkbox-group>
      </form>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  favoriteFoods: CheckboxFormControl[] = [
    {
      label: 'Pizza',
      id: 'pizza-checkbox',
      name: 'pizza-checkbox',
      checked: false,
    },
    {
      label: 'Ice Cream',
      id: 'ice-cream-checkbox',
      name: 'ice-cream-checkbox',
      checked: false,
    },
    {
      label: 'Twinkies',
      id: 'twinky-checkbox',
      name: 'twinky-checkbox',
      checked: false,
    },
  ];

  constructor(private readonly fb: FormBuilder) {
    console.log(this.buildFormArrayFromCheckboxConfig());
  }

  exampleForm: FormGroup = this.fb.group({
    singleCheckbox: ['', Validators.required],
  });

  exampleTwo: FormGroup = this.fb.group({
    checkboxGroup: this.fb.group({
      foods: this.buildFormArrayFromCheckboxConfig(),
    }),
  });

  get checkboxGroup(): FormGroup {
    return this.exampleTwo.get('checkboxGroup') as FormGroup;
  }

  buildFormArrayFromCheckboxConfig(): FormArray {
    const arr = this.favoriteFoods.map((food) => {
      const {checked, validatorOptions, ...rest} = food;
      return { ...rest, ...this.fb.control(checked, validatorOptions) };
    });

    return this.fb.array(arr);
  }
}
