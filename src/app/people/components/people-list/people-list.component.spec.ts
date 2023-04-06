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
import { CalculateAgePipe } from '../../pipes/calculate-age.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

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
      declarations: [PeopleListComponent, CalculateAgePipe],
      imports: [
        MaterialModule,
        UtilsModule,
        SharedModule,
        NoopAnimationsModule,
      ],
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

  it('should call service when onDelete is called', fakeAsync(() => {
    fixture.autoDetectChanges();
    const spy = mockPeopleService.deletePerson;

    expect(component.loading).toBeTruthy();
    tick(1);
    expect(component.loading).toBeFalsy();

    component.onDelete(0, 0);
    expect(spy).toHaveBeenCalled();
  }));
});
