import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

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
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
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
  @Input() control: FormControl = new FormControl();
  @Input() type: 'number' | 'text' | 'date' = 'text';
  @Input() max?: Date;
  @Input() required: 'true' | boolean = false;
  @Input() placeholder?: string;

  getErrorMessage() {
    const errors = this.control?.errors;
    if (errors?.['matDatepickerParse']) {
      return 'This Date is Invalid';
    }
    if (errors?.['matDatepickerMax']) {
      return 'This Date is later than allowed';
    }
    if (errors?.['required']) {
      return 'This field is required';
    }
    return 'unknown';
  }
}
