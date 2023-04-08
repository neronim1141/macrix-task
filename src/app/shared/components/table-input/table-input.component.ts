import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { MaterialModule } from 'src/app/material.module';

// https://stackoverflow.com/questions/53359598/how-to-change-angular-material-datepicker-format
export const APP_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  selector: 'mcx-table-input',
  templateUrl: './table-input.component.html',
  styleUrls: ['./table-input.component.scss'],
})
export class TableInputComponent {
  // QUESTION: It is possible, like in react, to make Inputs properties depend on other properties
  // like max is Date type only if type will be set to 'date'? If yes how?
  @Input() control: FormControl = new FormControl();
  @Input() type: 'number' | 'text' | 'date' = 'text';
  @Input() max?: Date;
  @Input() required: 'true' | boolean = false;
  @Input() placeholder?: string;

  get errorMessages() {
    return Object.keys(this.control.errors ?? {}).map((errorKey: string) => {
      return (
        {
          matDatepickerParse: 'This Date is Invalid',
          matDatepickerMax: 'This Date is later than allowed',
          required: 'This field is required',
          min: 'This value is too low',
          pattern: 'Invalid pattern',
        }[errorKey] ?? errorKey
      );
    });
  }
}
