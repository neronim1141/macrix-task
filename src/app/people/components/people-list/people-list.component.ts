import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PersonDTO } from '../../types/person-dto';
import { zip } from 'rxjs';

type PersonControls = {
  [key in keyof PersonDTO]: AbstractControl<PersonDTO[key]>;
};
@Component({
  selector: 'mcx-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  currentDate = new Date();
  displayedColumns: (keyof PersonDTO | 'age' | 'actions')[] = [
    'id',
    'firstName',
    'lastName',
    'streetName',
    'houseNumber',
    'apartmentNumber',
    'postalCode',
    'town',
    'phoneNumber',
    'dateOfBirth',
    'age',
    'actions',
  ];

  peopleForm!: FormGroup<{
    personRows: FormArray<FormGroup<PersonControls>>;
  }>;
  dataSource = new MatTableDataSource<FormGroup<PersonControls>>();

  constructor(
    private peopleService: PeopleService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getPeopleData();
  }

  onSubmit() {
    if (this.peopleForm.invalid) return;
    // Get edited rows values
    const dirtyControlsValues = this.peopleForm.controls.personRows.controls
      .filter(control => !control.pristine)
      .map(control => control.value);

    zip([
      ...dirtyControlsValues.map(person => {
        if (person.id)
          return this.peopleService.updatePerson(person.id, person);
        else
          return this.peopleService.createPerson(
            person as Omit<PersonDTO, 'id'>
          );
      }),
    ]).subscribe(() => this.getPeopleData());
  }

  onDelete(id: number) {
    this.peopleService.deletePerson(id).subscribe(() => {
      this.getPeopleData();
    });
  }

  onCancel() {
    this.getPeopleData();
  }

  private getPeopleData() {
    this.peopleService.getPeople().subscribe(people => {
      this.peopleForm = this.createForm(people);
      this.dataSource = new MatTableDataSource(
        this.peopleForm.controls.personRows.controls
      );
    });
  }
  private createForm(people: PersonDTO[]): FormGroup {
    return this.formBuilder.group({
      personRows: this.formBuilder.array(
        people.map(person => {
          return this.formBuilder.group({
            id: new FormControl(person.id),
            firstName: new FormControl(person.firstName, {
              validators: [Validators.required],
            }),
            lastName: new FormControl(person.lastName, {
              validators: [Validators.required],
            }),
            streetName: new FormControl(person.streetName, {
              validators: [Validators.required],
            }),
            houseNumber: new FormControl(person.houseNumber, {
              validators: [Validators.required],
            }),
            apartmentNumber: new FormControl(person.apartmentNumber),
            postalCode: new FormControl(person.postalCode, {
              validators: [Validators.required],
            }),
            town: new FormControl(person.town, {
              validators: [Validators.required],
            }),
            phoneNumber: new FormControl(person.phoneNumber, {
              validators: [Validators.required],
            }),
            dateOfBirth: new FormControl(person.dateOfBirth, {
              //TODO:  max validator
              validators: [Validators.required],
            }),
          });
        })
      ),
    });
  }
}
