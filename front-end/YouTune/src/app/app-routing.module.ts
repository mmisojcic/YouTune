import { LoginFormComponent } from './shared/login-form/login-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { RegisterFormComponent } from './shared/register-form/register-form.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegisterFormComponent }
    ]
  },
  { path: '**', redirectTo: '/welcome/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
