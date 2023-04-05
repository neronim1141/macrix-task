export interface PersonDTO {
  readonly id: number;
  firstName: string;
  lastName: string;
  streetName: string;
  houseNumber: string;
  apartmentNumber?: string;
  postalCode: string;
  town: string;
  phoneNumber: string;
  dateofBirth: Date;
}
export class Person {
  readonly id: number;
  firstName: string;
  lastName: string;
  streetName: string;
  houseNumber: string;
  apartmentNumber?: string;
  postalCode: string;
  town: string;
  phoneNumber: string;
  dateofBirth: Date;
  get age() {
    const today = new Date();
    const birthDate = new Date(this.dateofBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  constructor(person: PersonDTO) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.streetName = person.streetName;
    this.houseNumber = person.houseNumber;
    this.apartmentNumber = person.apartmentNumber;
    this.postalCode = person.postalCode;
    this.town = person.town;
    this.phoneNumber = person.phoneNumber;
    this.dateofBirth = person.dateofBirth;
  }
}
