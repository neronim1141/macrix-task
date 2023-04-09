import { NgModule } from '@angular/core';
import { PeopleService } from './services/people.service';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { TableControlDirective } from '../shared/directives/table-control.directive';
import { TableErrorIconComponent } from '../shared/components/table-error-icon/table-error-icon.component';

@NgModule({
  imports: [
    TableControlDirective,
    TableErrorIconComponent,
    PeopleListComponent,
  ],
  exports: [PeopleListComponent],
  providers: [PeopleService],
})
export class PeopleModule {}
