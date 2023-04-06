import { NgModule } from '@angular/core';
import { TableInputComponent } from './components/table-input/table-input.component';
import { TableDatepickerComponent } from './components/table-datepicker/table-datepicker.component';

@NgModule({
  imports: [TableInputComponent, TableDatepickerComponent],
  exports: [TableInputComponent, TableDatepickerComponent],
})
export class SharedModule {}
