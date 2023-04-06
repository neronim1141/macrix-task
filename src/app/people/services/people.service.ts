import { Injectable } from '@angular/core';
import { PersonDTO } from 'src/app/people/types/person-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PeopleService {
  private peopleUrl = 'api/people';
  constructor(private http: HttpClient) {}
  getPeople(): Observable<PersonDTO[]> {
    return this.http.get<PersonDTO[]>(this.peopleUrl);
  }
  deletePerson(id: number): Observable<null> {
    return this.http.delete<null>(`${this.peopleUrl}/${id}`);
  }
  updatePerson(
    id: PersonDTO['id'],
    person: Partial<PersonDTO>
  ): Observable<null> {
    return this.http.put<null>(`${this.peopleUrl}/${id}`, person);
  }
}
