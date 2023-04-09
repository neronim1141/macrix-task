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
  _show = false;
  @Input() set show(value: boolean) {
    this._show = value;
    this.setErrors();
  }
  @Input()
  set control(value: FormControl) {
    this._control = value;
    this._control.statusChanges.subscribe(() => {
      this.setErrors();
    });
  }
  private setErrors() {
    this._errorMessages = humanizeErrors(this._control?.errors ?? {}).join(
      '\n'
    );
  }
}
