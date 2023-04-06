import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PeopleModule } from './people/people.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { UtilsModule } from './utils/utils.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PeopleModule,
    MaterialModule,
    UtilsModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
