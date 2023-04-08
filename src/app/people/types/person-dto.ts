export type PersonDTO = {
  readonly id: number;
  firstName: string;
  lastName: string;
  streetName: string;
  houseNumber: string;
  apartmentNumber?: string;
  postalCode: string;
  town: string;
  phoneNumber: string;
  dateOfBirth: string;
};
