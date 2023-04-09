import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { humanizeErrors } from '../../utils/humanize-errors';

@Component({
  standalone: true,
  imports: [CommonModule, MaterialModule],
  selector: 'mcx-table-error-icon',
  templateUrl: './table-error-icon.component.html',
  styleUrls: ['./table-error-icon.component.scss'],
})
export class TableErrorIconComponent {
  _control?: FormControl;
  _errorMessages = '';
  @Input()
  set control(value: FormControl) {
    this._control = value;
    this._control.statusChanges.subscribe(() => {
      this._errorMessages = humanizeErrors(this._control?.errors ?? {}).join(
        '\n'
      );
    });
  }
}
