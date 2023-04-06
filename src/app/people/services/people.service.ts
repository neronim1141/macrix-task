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
    console.log(id);
    return this.http.delete<null>(`${this.peopleUrl}/${id}`);
  }
  updatePerson(
    id: PersonDTO['id'],
    person: Partial<PersonDTO>
  ): Observable<PersonDTO> {
    return this.http.put<PersonDTO>(`${this.peopleUrl}/${id}`, person);
  }
  createPerson(person: Omit<PersonDTO, 'id'>): Observable<PersonDTO> {
    return this.http.post<PersonDTO>(`${this.peopleUrl}`, person);
  }
}
