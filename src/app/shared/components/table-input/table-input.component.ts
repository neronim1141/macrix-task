import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { humanizeErrors } from '../../utils/humanizeErrors';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
  selector: 'mcx-table-input',
  templateUrl: './table-input.component.html',
  styleUrls: ['./table-input.component.scss'],
})
export class TableInputComponent {
  @Input() control: FormControl = new FormControl();
  @Input() type: 'number' | 'text' | 'date' = 'text';
  @Input() max?: Date;
  @Input() required: 'true' | boolean = false;

  getErrorMessage() {
    return humanizeErrors(this.control?.errors);
  }
}
