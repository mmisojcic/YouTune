import { Register } from './../models/register.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  apiUrl = 'https://localhost:44318/api/';

  constructor(private http: HttpClient) {}

  save<T1, T2>(model, endPoint: string): Observable<T1> {
    return this.http.post(this.apiUrl + endPoint, model).pipe(
      map(res => {
        return res;
      })
    );
  }

  toJson(map) {
    return JSON.stringify(Array.from(map.entries()));
  }
}
