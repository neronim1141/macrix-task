import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../types/person';
@Component({
  selector: 'mcx-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'action'];
  people: Person[] = [];
  constructor(private peopleService: PeopleService) {}
  ngOnInit(): void {
    this.peopleService.getPeople().subscribe(people => (this.people = people));
  }
}
