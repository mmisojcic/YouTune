import { UserDTO } from './../../DTOs/user.dto';
import { SpinnerService } from './../../services/spinner.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/models/register.model';
import { api } from '../../shared/config/api.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { domFaderAnimation } from 'src/app/shared/animations/dom-fader.animation';
import { Role } from 'src/app/models/role.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'yt-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  animations: [domFaderAnimation]
})
export class RegisterFormComponent implements OnInit {
  registerFrom: FormGroup;
  registerInfo: Register;

  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private spinnerService: SpinnerService
  ) {}

  onRegister() {
    // Filling register model with form data
    this.registerInfo = new Register(
      this.registerFrom.controls['username'].value,
      this.registerFrom.controls['password'].value,
      this.registerFrom.controls['email'].value
    );

    // show spinner
    this.spinnerService.spinnerShow();

    // sending request
    this.loginService
      .register(api.fullUrl(api.users.register()), this.registerInfo)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          this.errorMessage = err;
        }
      );
  }

  ngOnInit() {
    // Returns object that will represent form nad its controls to the registerForm local var
    this.registerFrom = this.formBuilder.group({
      username: [null],
      password: [null],
      email: [null]
    });
  }
}
