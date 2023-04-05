import { Injectable } from '@angular/core';
import { Person } from 'src/app/people/types/person';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PeopleService {
  private peopleUrl = 'api/people';
  constructor(private http: HttpClient) {}
  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.peopleUrl);
  }
  deletePerson(id: number): Observable<null> {
    return this.http.delete<null>(`${this.peopleUrl}/${id}`);
  }
}
