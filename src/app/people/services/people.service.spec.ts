import { TestBed } from '@angular/core/testing';
import { PeopleService } from './people.service';
import { generateFakePerson } from '../utils/test.utils';
import { InMemoryDataModule } from 'src/app/in-memory-data/in-memory-data.module';

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InMemoryDataModule],
      providers: [PeopleService],
    });
    service = TestBed.inject(PeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getPeople should return value from observable', (done: DoneFn) => {
    service.getPeople().subscribe(value => {
      expect(value).not.toBe([]);
      done();
    });
  });

  it('#deletePerson should return null from observable', (done: DoneFn) => {
    service.deletePerson(0).subscribe(value => {
      expect(value).toBeNull();
      done();
    });
  });

  it('#updatePerson should return person from observable', (done: DoneFn) => {
    const person = generateFakePerson(0);
    service.updatePerson(0, person).subscribe(value => {
      expect(value).not.toBeNull();
      expect(value.id).toEqual(person.id);

      done();
    });
  });

  it('#createPerson should return person from observable', (done: DoneFn) => {
    const { id, ...person } = generateFakePerson(0);
    service.createPerson(person).subscribe(value => {
      expect(value).not.toBeNull();
      expect(value.id).not.toEqual(id);
      done();
    });
  });
});
