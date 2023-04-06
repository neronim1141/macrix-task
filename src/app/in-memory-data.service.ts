import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { PersonDTO } from 'src/app/people/types/person-dto';
import { InMemoryDbService } from 'angular-in-memory-web-api';
export const generateFakePerson = (id: number): PersonDTO => ({
  id,
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
  dateOfBirth: faker.date.birthdate(),
});
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
