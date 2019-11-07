import { SpinnerService } from '../../shared/services/spinner.service';
import { Login } from './../../models/login.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { domFaderAnimation } from 'src/app/shared/animations/dom-fader.animation';

@Component({
  selector: 'yt-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  animations: [domFaderAnimation]
})
export class LoginFormComponent implements OnInit {
  loginFrom: FormGroup;
  loginInfo: Login;

  spinning = this.spinnerService.spinning;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private spinnerService: SpinnerService) {}

  onLogin() {
    // Filling register model with form data
    this.loginInfo = new Login(this.loginFrom.controls['username'].value, this.loginFrom.controls['password'].value);

    // trigger spinner
    this.spinnerService.spinnerShow();

    // sending request
    this.loginService.login('login', this.loginInfo).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
        this.errorMessage = err;
      }
    );
  }

  ngOnInit() {
    // Returns object that will represent form nad its controls to the registerForm local var
    this.loginFrom = this.formBuilder.group({
      username: [null],
      password: [null]
    });
  }
}
