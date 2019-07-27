import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

import { LoginPage } from "./login";

import { ForgotPasswordPageModule } from "../../shared/modal/forgotPassword/forgotPassword.module";
@NgModule({
  declarations: [LoginPage],
  imports: [
    ForgotPasswordPageModule,
    IonicPageModule.forChild(LoginPage)]
})
export class LoginPageModule {}
