import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ViewController,
  LoadingController
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { authTattoProvider } from "../../../../providers/api/authTatto";
import { AlertProvider } from "../../../../providers/alert";
import { StorageDB } from "../../../../providers/storageDB";

@IonicPage()
@Component({
  selector: "forgot-password",
  templateUrl: "forgotPassword.html"
})
export class ForgotPassword {
  emailValidator = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  formForgot: FormGroup;
  formSendForgot: FormGroup;
  showMessage: boolean = false;
  message: string = "";
  sendEmailPassword: number = 0;
  messageForgot: string = "Validar correo";
  constructor(
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public loading: LoadingController,
    public authProviders: authTattoProvider,
    public alertCtrl: AlertProvider,
    public storageDb: StorageDB,
    public navCtrl:NavController,
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
    this.formSendForgot = this.formBuilder.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    });
  }

  ionChange($event) {
    if (
      !this.formForgot.controls["email"].valid &&
      this.formForgot.controls["email"].dirty
    ) {
      this.showMessage = true;
      this.message = "Por favor ingrese un correo electronico valido";
    } else {
      this.showMessage = false;
    }
  }

  async validEmailForgotPassword() {
    const load = this.loading.create({ content: "Validando email..." });
    load.present();
    const email = await this.authProviders.validEmail(this.formForgot.value);
    if (email["data"]) {
      if (email["data"]["code"] === 200) {
        load.dismiss();
        this.messageForgot = "Restablecer contraseña";
        this.sendEmailPassword = 1;
        this.storageDb.setItem("sub", email["data"]["res"]["_id"]);
      } else {
        load.dismiss();
        this.alertCtrl.showAlert(
          null,
          `No hay ninguna cuenta con ${
            this.formForgot.controls["email"].value
          } `,
          "Cerrar"
        );
      }
    } else {
      load.dismiss();
      console.error(email);
      this.alertCtrl.showAlert(
        "Error",
        "Hubo un error , intenta mas tarde",
        "Cerrar"
      );
    }
  }

  async getSub() {
    return await this.storageDb.getItem("sub");
  }

  async updateForgotPassword() {
    const sub = await this.getSub();
    const load = this.loading.create({ content: "Actualizando contraseña..." });
    load.present();
    if (
      this.formSendForgot.controls["confirmPassword"].value ===
      this.formSendForgot.controls["password"].value
    ) {
      const sendPassword = await this.authProviders.forgotPassword(
        this.formSendForgot.value,
        sub
      );
      if (sendPassword['data']) {
        load.dismiss()
        if (sendPassword['data']['code'] === 201) {
          this.alertCtrl.showAlert(null,'Contraseña actualizada', 'Cerrar')
          this.navCtrl.pop()
        }
      }else{
        load.dismiss()
        console.error('Error en ', JSON.stringify(sendPassword))
      }
      console.log(JSON.stringify(sendPassword));
    } else {
      this.alertCtrl.showAlert(null, "No coincide la contraseña", "Cerrar");
    }
  }

  close() {
    this.sendEmailPassword = 0;
    this.viewCtrl.dismiss();
  }
}
