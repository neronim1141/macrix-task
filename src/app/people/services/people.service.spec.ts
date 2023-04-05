import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'src/app/in-memory-data.service';

import { PeopleService } from './people.service';

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
      ],
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
});
