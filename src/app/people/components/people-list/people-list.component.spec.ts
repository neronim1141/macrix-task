import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { generateFakePerson } from 'src/app/in-memory-data.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { PeopleService } from '../../services/people.service';

import { PeopleListComponent } from './people-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UtilsModule } from 'src/app/shared/utils.module';

describe('PeopleListComponent', () => {
  let component: PeopleListComponent;
  let fixture: ComponentFixture<PeopleListComponent>;
  let mockPeopleService: jasmine.SpyObj<PeopleService>;
  beforeEach(async () => {
    const spyPeopleService = jasmine.createSpyObj('PeopleService', [
      'getPeople',
      'deletePerson',
    ]);

    await TestBed.configureTestingModule({
      declarations: [PeopleListComponent],
      imports: [MaterialModule, UtilsModule, NoopAnimationsModule],
      providers: [
        {
          provide: PeopleService,
          useValue: spyPeopleService,
        },
      ],
    }).compileComponents();
    mockPeopleService = TestBed.inject(
      PeopleService
    ) as jasmine.SpyObj<PeopleService>;
    mockPeopleService.getPeople.and.returnValue(
      of([generateFakePerson(0)]).pipe(delay(1))
    );
    mockPeopleService.deletePerson.and.returnValue(of());

    fixture = TestBed.createComponent(PeopleListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.autoDetectChanges();
    expect(component).toBeTruthy();
  });

  it('should call onDelete when Delete button is clicked', fakeAsync(() => {
    spyOn(component, 'onDelete');
    fixture.autoDetectChanges(); // ASK: why its not working in BeforeEach

    expect(component.loading).toBeTruthy();
    tick(1);
    expect(component.loading).toBeFalsy();

    const row = fixture.debugElement.nativeElement.querySelectorAll('tr');
    const button = Array.from<HTMLButtonElement>(
      row[1].querySelectorAll('button')
    ).find((el: HTMLButtonElement) => el.textContent?.includes('delete'));
    button?.click();
    expect(component.onDelete).toHaveBeenCalled();
  }));

  it('should call service when onDelete is called', () => {
    const spy = mockPeopleService.deletePerson;
    component.onDelete(0);
    expect(spy).toHaveBeenCalled();
  });
});
