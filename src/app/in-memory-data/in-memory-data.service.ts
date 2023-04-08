import { Injectable } from '@angular/core';
import { PersonDTO } from 'src/app/people/types/person-dto';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { generateFakePerson } from '../people/utils/test.utils';

export const PEOPLE_DATA = Array.from({ length: 5 }).map((_, i) =>
  generateFakePerson(i)
);
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const people: PersonDTO[] = PEOPLE_DATA;
    return { people };
  }
  genId(people: PersonDTO[]): number {
    return people.length > 0
      ? Math.max(...people.map(person => person.id)) + 1
      : 1;
  }
}
