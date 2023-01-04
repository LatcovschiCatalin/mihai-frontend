import {NgModule} from '@angular/core';
import {AuthGuard} from './auth-guard.service';
import {AuthService} from './auth.service';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  exports: [],
  declarations: [
    LoginComponent
  ]
})
export class AuthModule {
}
