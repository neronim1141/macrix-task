import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PeopleModule } from './people/people.module';
import { SharedModule } from './shared/shared.module';
import { InMemoryDataModule } from './in-memory-data/in-memory-data.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [InMemoryDataModule, PeopleModule, SharedModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
