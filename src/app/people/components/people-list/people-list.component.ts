import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PersonDTO } from '../../types/person-dto';
import { zip } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { TableErrorIconComponent } from 'src/app/shared/components/table-error-icon/table-error-icon.component';
import { CalculateAgePipe } from '../../pipes/calculate-age.pipe';
import { CommonModule } from '@angular/common';
import { TableControlDirective } from 'src/app/shared/directives/table-control.directive';

type PersonControls = {
  [key in keyof PersonDTO]: AbstractControl<PersonDTO[key]>;
};
@Component({
  standalone: true,
  imports: [
    TableControlDirective,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TableErrorIconComponent,
    CalculateAgePipe,
  ],
  selector: 'mcx-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  currentDate = new Date();
  displayedColumns: (keyof PersonDTO | 'age' | 'actions')[] = [
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

  onDelete(id: number) {
    // If we want to refresh the data from server on cancel then i assume it is allowed to refresh it after correct entry deletion
    this.peopleService.deletePerson(id).subscribe(() => {
      this.getPeopleData();
    });
  }

  onAdd() {
    const control = this.peopleForm.controls.personRows;
    control.push(this.createNewRowFormGroup());
    // We mark it to enable buttons, because push on FormArray don't trigger it
    this.peopleForm.markAsDirty();
    this.dataSource = new MatTableDataSource(control.controls);
  }

  onCancel() {
    this.getPeopleData();
  }

  onSubmit() {
    if (this.peopleForm.invalid) return;
    // Get edited/added rows values
    const dirtyControlsValues = this.peopleForm.controls.personRows.controls
      .filter(control => !control.pristine)
      .map(control => control.value);

    zip([
      ...dirtyControlsValues.map(person => {
        if (person.id)
          return this.peopleService.updatePerson(person.id, person);
        else
          return this.peopleService.createPerson(
            // I'm allowing myself to cast here because form builder don't let the code execute if the required fields are not here
            person as Omit<PersonDTO, 'id'>
          );
      }),
      // The same reason as in onDelete
    ]).subscribe(() => this.getPeopleData());
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
        people.map(person => this.createNewRowFormGroup(person))
      ),
    });
  }

  private createNewRowFormGroup(person?: PersonDTO): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(person?.id),
      firstName: new FormControl(person?.firstName, Validators.required),
      lastName: new FormControl(person?.lastName, Validators.required),
      streetName: new FormControl(person?.streetName, Validators.required),
      houseNumber: new FormControl(person?.houseNumber, [
        Validators.required,
        Validators.min(0),
      ]),
      apartmentNumber: new FormControl(person?.apartmentNumber, [
        Validators.min(0),
      ]),
      postalCode: new FormControl(person?.postalCode, Validators.required),
      town: new FormControl(person?.town, Validators.required),
      phoneNumber: new FormControl(person?.phoneNumber, [
        Validators.required,
        // TODO: Preferably use package for this check as the international numbers have too many configurations
        Validators.pattern('[+\\- \\(\\)0-9]*'),
      ]),
      // I'm not setting max date validator here because material datepicker has them internally
      // when the corresponding attributes are provided
      dateOfBirth: new FormControl(person?.dateOfBirth, Validators.required),
    });
  }
}
