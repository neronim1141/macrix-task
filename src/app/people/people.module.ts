import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PeopleService } from './services/people.service';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { MaterialModule } from '../shared/material.module';
import { UtilsModule } from '../shared/utils.module';
import { CalculateAgePipe } from './pipes/calculate-age.pipe';

@NgModule({
  declarations: [PeopleListComponent, CalculateAgePipe],
  imports: [BrowserModule, MaterialModule, UtilsModule],
  exports: [PeopleListComponent],
  providers: [PeopleService],
})
export class PeopleModule {}
