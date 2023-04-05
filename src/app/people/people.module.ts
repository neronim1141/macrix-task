import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PeopleService } from './services/people.service';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [PeopleListComponent],
  imports: [BrowserModule, MaterialModule],
  exports: [PeopleListComponent],
  providers: [PeopleService],
})
export class PeopleModule {}
