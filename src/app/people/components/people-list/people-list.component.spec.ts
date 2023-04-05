import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  generateFakePerson,
  InMemoryDataService,
} from 'src/app/in-memory-data.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { PeopleService } from '../../services/people.service';

import { PeopleListComponent } from './people-list.component';

describe('PeopleListComponent', () => {
  let component: PeopleListComponent;
  let fixture: ComponentFixture<PeopleListComponent>;
  let peopleService: PeopleService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleListComponent],
      imports: [
        MaterialModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
      ],
      providers: [PeopleService],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleListComponent);
    component = fixture.componentInstance;
    peopleService = TestBed.inject(PeopleService);
  });

  it('should create', () => {
    fixture.autoDetectChanges();
    expect(component).toBeTruthy();
  });

  it('should call onDelete when Delete button is clicked', fakeAsync(() => {
    spyOn(peopleService, 'getPeople').and.returnValue(
      of([generateFakePerson(0)]).pipe(delay(1))
    );
    spyOn(component, 'onDelete');
    fixture.autoDetectChanges();
    expect(component.loading).toBeTruthy();
    tick(1);
    expect(component.loading).toBeFalsy();

    const button = fixture.debugElement.nativeElement.querySelector(
      'button[data-test-id="delete-0"]'
    );
    button.click();
    expect(component.onDelete).toHaveBeenCalled();
  }));

  it('should call service when onDelete is called', () => {
    const spy = spyOn(peopleService, 'deletePerson').and.returnValue(of());
    fixture.autoDetectChanges();
    component.onDelete(0);
    expect(spy).toHaveBeenCalled();
  });

  it('should call onEdit when Edit button is clicked', fakeAsync(() => {
    spyOn(peopleService, 'getPeople').and.returnValue(
      of([generateFakePerson(0)]).pipe(delay(1))
    );
    spyOn(component, 'onEdit');
    fixture.autoDetectChanges();

    expect(component.loading).toBeTruthy();
    tick(1);
    expect(component.loading).toBeFalsy();

    const button = fixture.debugElement.nativeElement.querySelector(
      'button[data-test-id="edit-0"]'
    );
    button.click();

    expect(component.onEdit).toHaveBeenCalled();
  }));
});
