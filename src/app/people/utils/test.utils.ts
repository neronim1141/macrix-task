import { faker } from '@faker-js/faker';
import { PersonDTO } from '../types/person-dto';

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
  phoneNumber: faker.phone.number('###-###-###'),
  dateOfBirth: faker.date.birthdate().toISOString(),
});
