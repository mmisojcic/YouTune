import { LoginConverter } from './../converters/login.converter';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/register.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { User } from '../models/user.model';
import { RegisterConverter } from '../converters/register.converter';
import { UserConverter } from '../converters/user.converter';
import { UserDTO } from '../DTOs/user.dto';
import { Login } from '../models/login.model';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  spinning = false;
  registerConverter = new RegisterConverter();
  loginConverter = new LoginConverter();
  userConverter = new UserConverter();

  constructor(
    private http: HttpClient,
    private spinerService: SpinnerService
  ) {}

  // Registers new user
  public register(apiUrl: string, model: Register): Observable<User> {
    const dto = this.registerConverter.modelToDTO(model);
    return this.http.post(apiUrl, dto).pipe(
      map((res: UserDTO) => {
        return this.userConverter.DTOtoModel(res);
      }),
      catchError(err => {
        console.log('Error ocurred: ', err);
        return throwError(err);
      }),
      finalize(() => {
        // hide spinner
        this.spinerService.spinnerHide();
        console.log('kraj');
      })
    );
  }

  // Logs in user
  public login(apiUrl: string, model: Login): Observable<User> {
    const dto = this.loginConverter.modelToDTO(model);
    return this.http.post(apiUrl, dto).pipe(
      map((res: UserDTO) => {
        return this.userConverter.DTOtoModel(res);
      }),
      catchError(err => {
        console.log('Error ocurred: ', err);
        return throwError(err);
      }),
      finalize(() => {
        // hide spinner
        this.spinerService.spinnerHide();
        console.log('kraj');
      })
    );
  }
}
