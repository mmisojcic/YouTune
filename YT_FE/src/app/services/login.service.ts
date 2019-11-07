import { ApiURLGeneratorService } from '../shared/services/api-URL-generator.service';
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
import { SpinnerService } from '../shared/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  spinning = false;
  registerConverter = new RegisterConverter();
  loginConverter = new LoginConverter();
  userConverter = new UserConverter();

  constructor(private http: HttpClient, private spinerService: SpinnerService, private apiURLGenerator: ApiURLGeneratorService) {}

  // Registers new user
  register(endpointName: string, model: Register): Observable<User> {
    const DTO = this.registerConverter.modelToDTO(model);
    const URL = this.apiURLGenerator.generateURL(endpointName);

    return this.http.post(URL, DTO).pipe(
      map((res: UserDTO) => {
        return this.userConverter.DTOtoModel(res);
      }),
      catchError(err => {
        console.log('ERROR: ', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        // hide spinner
        this.spinerService.spinnerHide();
        console.log('kraj');
      })
    );
  }

  // Logs in user
  login(endpointName: string, model: Login): Observable<User> {
    const URL = this.apiURLGenerator.generateURL(endpointName);
    const DTO = this.loginConverter.modelToDTO(model);

    return this.http.post(URL, DTO).pipe(
      map((res: UserDTO) => {
        return this.userConverter.DTOtoModel(res);
      }),
      catchError(err => {
        console.log('ERROR: ', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        // hide spinner
        this.spinerService.spinnerHide();
        console.log('kraj');
      })
    );
  }
}
