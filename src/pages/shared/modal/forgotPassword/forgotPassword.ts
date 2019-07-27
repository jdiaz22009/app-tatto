import { Component } from "@angular/core";
import {
  IonicPage,
  NavParams,
  NavController,
  ViewController
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@IonicPage()
@Component({
  selector: "forgot-password",
  templateUrl: "forgotPassword.html"
})
export class ForgotPassword {
  emailValidator = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  formForgot: FormGroup;
  showMessage:boolean = false
  message:string = ''
  constructor(
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder
  ) {
    this.formForgot = this.formBuilder.group({
      email: [
        "",
        Validators.compose([
          Validators.pattern(this.emailValidator),
          Validators.required
        ])
      ]
    });
  }

  ionChange($event){
    if (!this.formForgot.controls['email'].valid && this.formForgot.controls['email'].dirty) {
      this.showMessage = true
      this.message = 'Por favor ingrese un correo electronico valido'
      console.log('Error', this.formForgot.controls['email'].hasError['pattern'])
    }else{
      this.showMessage = false
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
