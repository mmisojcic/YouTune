import { LoginFormComponent } from './components/login-form/login-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { TstComponent } from './components/tst/tst.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegisterFormComponent }
    ]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  { path: 'tst', component: TstComponent },
  { path: '**', redirectTo: '/welcome/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
