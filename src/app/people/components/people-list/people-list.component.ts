import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../types/person';
@Component({
  selector: 'mcx-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  loading = false;
  displayedColumns: (keyof Person | 'actions')[] = [
    'id',
    'firstName',
    'lastName',
    'streetName',
    'houseNumber',
    'apartmentNumber',
    'postalCode',
    'town',
    'phoneNumber',
    'dateofBirth',
    'age',
    'actions',
  ];
  colspan = this.displayedColumns.length;
  people: Person[] = [];
  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.loading = true;
    this.peopleService.getPeople().subscribe(people => {
      this.people = people.map(person => new Person(person));
      this.loading = false;
    });
  }
  onDelete(id: number) {
    this.peopleService.deletePerson(id).subscribe(() => {
      this.people = this.people.filter(person => person.id !== id);
    });
  }
  onEdit(id: number): void {
    throw new Error('Method not implemented. id called: ' + id);
  }
}
