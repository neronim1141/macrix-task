import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { humanizeErrors } from '../../utils/humanizeErrors';

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
  selector: 'mcx-table-datepicker',
  templateUrl: './table-datepicker.component.html',
  styleUrls: ['./table-datepicker.component.scss'],
})
export class TableDatepickerComponent {
  @Input() control: FormControl = new FormControl();
  @Input() max?: Date;
  getErrorMessage() {
    return humanizeErrors(this.control?.errors);
  }
}
