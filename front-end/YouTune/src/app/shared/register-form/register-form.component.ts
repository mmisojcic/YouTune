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
  user: User;

  constructor() {}

  ngOnInit() {}
}
