import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PeopleModule } from './people/people.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { InMemoryDataModule } from './in-memory-data/in-memory-data.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    PeopleModule,
    MaterialModule,
    SharedModule,
    BrowserAnimationsModule,
    InMemoryDataModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
