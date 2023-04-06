import { TestBed } from '@angular/core/testing';

import { PeopleService } from './people.service';
import { generateFakePerson } from 'src/app/utils/in-memory-data/in-memory-data.service';
import { UtilsModule } from 'src/app/utils/utils.module';

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UtilsModule],
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
    service.updatePerson(0, generateFakePerson(0)).subscribe(value => {
      expect(value).not.toBeNull();
      done();
    });
  });
});
