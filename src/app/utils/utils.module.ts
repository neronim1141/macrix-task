import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InMemoryDataService } from './in-memory-data/in-memory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      post204: false,
      put204: false,
    }),
  ],
  exports: [FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class UtilsModule {}
