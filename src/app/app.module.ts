import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PeopleModule } from './people/people.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilsModule } from './shared/utils.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PeopleModule, UtilsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
