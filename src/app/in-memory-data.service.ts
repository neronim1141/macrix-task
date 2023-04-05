import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Person } from 'src/app/people/types/person';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const people: Person[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      streetName: faker.address.street(),
      houseNumber: faker.address.buildingNumber(),
      apartmentNumber: faker.helpers.arrayElement([
        faker.address.buildingNumber(),
        undefined,
      ]),
      postalCode: faker.address.zipCode('##-###'),
      town: faker.address.cityName(),
      phoneNumber: faker.phone.number('+## ###-###-###'),
      dateofBirth: faker.date.birthdate(),
    }));
    return { people };
  }
  genId(people: Person[]): number {
    return people.length > 0
      ? Math.max(...people.map(person => person.id)) + 1
      : 1;
  }
}
