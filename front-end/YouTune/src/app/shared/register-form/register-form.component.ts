import { RestApiService } from './../../core/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/core/models/register.model';
import { RegisterDTO } from 'src/app/core/DTOs/register.dto';
import { User } from 'src/app/core/models/user.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'yt-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  user: User = new User();

  constructor(private restApi: RestApiService) {}

  ngOnInit() {}

  test() {
    const reg: Register = new Register('marko', 'marko1234', 'mm@mm.com');

    this.restApi.save<Register, RegisterDTO>(reg, 'Users/10').subscribe(
      res => {
        this.user = res;
        console.log(this.user);
      },
      err => {
        console.log('http error on login by id ' + err.status);
      }
    );
  }
}
