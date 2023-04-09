import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PeopleService } from '../../services/people.service';
import { PeopleListComponent } from './people-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { generateFakePerson } from '../../utils/test.utils';

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
      imports: [PeopleListComponent, NoopAnimationsModule],
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

    mockPeopleService.getPeople.and.returnValue(of([generateFakePerson(0)]));
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
    // QUESTION: What might be the cause that this line is not working at the end BeforeEach?
    fixture.autoDetectChanges();
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

    component.onDelete(0);
    expect(spy).toHaveBeenCalled();
  }));
});
