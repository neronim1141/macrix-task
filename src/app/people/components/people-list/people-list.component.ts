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
} & {
  isLoading: AbstractControl<boolean>;
};
@Component({
  selector: 'mcx-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  loading = false;
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
  people: PersonDTO[] = [];

  dataSource = new MatTableDataSource<AbstractControl<PersonDTO>>();
  constructor(
    private peopleService: PeopleService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.peopleService.getPeople().subscribe(people => {
      this.people = people;
      this.peopleForm = this.createForm();
      this.dataSource = new MatTableDataSource(
        (this.peopleForm.get('personRows') as FormArray).controls
      );
      this.loading = false;
    });
  }
  private createForm(): FormGroup {
    return this.formBuilder.group({
      personRows: this.formBuilder.array(
        this.people.map(person => {
          return this.formBuilder.group({
            id: new FormControl(person.id, { nonNullable: true }),
            firstName: new FormControl(person.firstName, {
              nonNullable: true,
              validators: [Validators.required],
            }),
            lastName: new FormControl(person.lastName, {
              nonNullable: true,
              validators: [Validators.required],
            }),
            streetName: new FormControl(person.streetName, {
              nonNullable: true,
              validators: [Validators.required],
            }),
            houseNumber: new FormControl(person.houseNumber, {
              nonNullable: true,
              validators: [Validators.required],
            }),
            apartmentNumber: new FormControl(person.apartmentNumber),
            postalCode: new FormControl(person.postalCode, {
              nonNullable: true,
              validators: [Validators.required],
            }),
            town: new FormControl(person.town, {
              nonNullable: true,
              validators: [Validators.required],
            }),
            phoneNumber: new FormControl(person.phoneNumber, {
              nonNullable: true,
              validators: [Validators.required],
            }),
            dateOfBirth: new FormControl(person.dateOfBirth, {
              nonNullable: true,
              validators: [Validators.required],
            }),
            isLoading: new FormControl(false, {
              nonNullable: true,
              validators: [Validators.required],
            }),
          });
        })
      ),
    });
  }
  onDelete(id: number, index: number) {
    const control = this.peopleForm.get('personRows') as FormArray;

    control.at(index).get('isLoading')?.patchValue(true);
    this.dataSource = new MatTableDataSource(control.controls);

    this.peopleService.deletePerson(id).subscribe(() => {
      this.people = this.people.filter(person => person.id !== id);
      console.log(index);

      control.removeAt(index);
      control.at(index).get('isLoading')?.patchValue(false);

      this.dataSource = new MatTableDataSource(control.controls);
    });
  }
  onSubmit() {
    if (this.peopleForm.invalid) return;
    this.loading = true;
    const touchedControls = this.peopleForm.controls.personRows.controls.filter(
      control => control.touched
    );
    const personsDTOs = touchedControls.map(control => {
      const dto = control.value;
      delete dto.isLoading;
      return dto as PersonDTO;
    });
    zip([
      ...personsDTOs.map(person =>
        this.peopleService.updatePerson(person.id, person)
      ),
    ]).subscribe(() => {
      this.peopleService.getPeople().subscribe(people => {
        this.people = people;
        this.peopleForm = this.createForm();
        this.dataSource = new MatTableDataSource(
          (this.peopleForm.get('personRows') as FormArray).controls
        );
        this.loading = false;
      });
    });
  }
  onCancel() {
    this.peopleForm = this.createForm();
    this.dataSource = new MatTableDataSource(
      (this.peopleForm.get('personRows') as FormArray).controls
    );
  }
}
