import { LoginConverter } from './../converters/login.converter';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/register.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { RegisterConverter } from '../converters/register.converter';
import { UserConverter } from '../converters/user.converter';
import { UserDTO } from '../DTOs/user.dto';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  registerConverter = new RegisterConverter();
  loginConverter = new LoginConverter();
  userConverter = new UserConverter();

  constructor(private http: HttpClient) {}

  // Registers new user
  public register(apiUrl: string, model: Register): Observable<User> {
    const dto = this.registerConverter.modelToDTO(model);
    return this.http.post(apiUrl, dto).pipe(
      map(
        (res: UserDTO) => {
          return this.userConverter.DTOtoModel(res);
        },
        err => {
          console.log('Something went wrong' + err);
        }
      )
    );
  }

  // Logs in user
  public login(apiUrl: string, model: Login): Observable<User> {
    const dto = this.loginConverter.modelToDTO(model);
    return this.http.post(apiUrl, dto).pipe(
      map(
        (res: UserDTO) => {
          return this.userConverter.DTOtoModel(res);
        },
        err => {
          console.log('Something went wrong' + err);
        }
      )
    );
  }
}
