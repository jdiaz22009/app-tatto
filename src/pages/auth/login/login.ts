import { Component } from "@angular/core";

import { IonicPage, NavController, NavParams ,MenuController} from "ionic-angular";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { authTattoProvider } from "../../../providers/api/authTatto";
import { AlertProvider } from "../../../providers/alert";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  email_validator = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  loginForm: FormGroup;
  loginUser = {};
  showMessage:number;
  message:string;
  constructor(
    public navctrl: NavController,
    public navParams: NavParams,
    public apiRest: authTattoProvider,
    public alertP: AlertProvider,
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder
  ) {
    this.menuCtrl.swipeEnable(true)
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.pattern(this.email_validator)])
      ],
      password: ["", Validators.required]
    });
  }

  goRegister() {
    this.navctrl.push("RegisterPage");
  }

  ionChange($event){
    if (!this.loginForm.controls.email.valid && this.loginForm.controls.email.dirty) {
      this.showMessage = 1
      this.message = "Por favor ingrese un correo electronico valido"
    }else{
      this.showMessage = 0
    }
  }

  login() {
    this.apiRest
      .login(this.loginForm.value)
      .then(res => {
        console.log(JSON.stringify(res.data));
        if (res.data["code"] === 200) {
          if (!res.data["findUser"]["isactive"]) {
            this.alertP.showAlert(
              null,
              "Esta cuenta todavia no ha sido aceptada por favor intente mas tarde",
              "Cerrar"
            );
          } else {
            console.log("soy verdadero");
          }
        }
      })
      .catch(e => {
        console.error(e);
      });
  }
}
