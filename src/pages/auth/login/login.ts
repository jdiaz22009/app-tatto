import { Component } from "@angular/core";

import { IonicPage, NavController, NavParams } from "ionic-angular";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  email_validator = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  loginForm: FormGroup;
  loginUser = {};
  constructor(
    public navctrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.pattern(this.email_validator)])
      ],
      password: ["", Validators.required]
    });
  }

  goRegister(){
    this.navctrl.push('RegisterPage')
  }
}
