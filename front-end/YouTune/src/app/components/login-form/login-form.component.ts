import { Login } from './../../models/login.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { api } from '../../shared/config/api.config';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'yt-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginFrom: FormGroup;
  loginInfo: Login;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  onLogin() {
    // Filling register model with form data
    this.loginInfo = new Login(
      this.loginFrom.controls['username'].value,
      this.loginFrom.controls['password'].value
    );

    // sending request
    this.loginService
      .login(api.fullUrl(api.users.login()), this.loginInfo)
      .subscribe(res => {
        console.log(res);
      });
  }

  ngOnInit() {
    // Returns object that will represent form nad its controls to the registerForm local var
    this.loginFrom = this.formBuilder.group({
      username: [null],
      password: [null]
    });
  }
}
