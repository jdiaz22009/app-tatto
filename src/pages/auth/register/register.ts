import { Component } from "@angular/core";

import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  MenuController,
  ModalController
} from "ionic-angular";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { RegisterTatto } from "@models/auth";

import { AlertProvider } from "../../../../src/providers/alert";
import { authTattoProvider } from "../../../../src/providers/api/authTatto";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  email_validator = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  registerForm: FormGroup;
  registerFinish: FormGroup;
  userTatto = {} as RegisterTatto;
  registerUser = {};
  show: number = 0;
  message: string = "";
  showMessage: number = 0;
  check: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertProvider,
    public loadingCtrl: LoadingController,
    public apiRest: authTattoProvider,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    private formbuilder: FormBuilder,
  ) {
    this.menuCtrl.swipeEnable(false);
    this.registerForm = this.formbuilder.group({
      name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: [
        "",
        Validators.compose([
          Validators.pattern(this.email_validator),
          Validators.required
        ])
      ],
      password: ["", Validators.required],
      repetPassword: ["", Validators.required]
    });

    this.registerFinish = this.formbuilder.group({
      alias: [""],
      ageExp: [""],
      phone: ["", Validators.required],
      urlFacebook: [""],
      urlInstagram: [""],
      checkTermns: [false, Validators.required]
    });
  }

  ionViewDidLoad() {
    this.show = 1;
  }

  userValid() {
    if (
      this.registerForm.controls["repetPassword"].value ===
      this.registerForm.controls["password"].value
    ) {
      this.userTatto.name = this.registerForm.controls["name"].value;
      this.userTatto.last_name = this.registerForm.controls["last_name"].value;
      this.userTatto.email = this.registerForm.controls["email"].value;
      this.userTatto.password = this.registerForm.controls["password"].value;
      this.userTatto.rol = 2;
      this.show = 2;
    } else {
      this.show = 1;
      this.alertCtrl.showAlert("Aviso!", "Contraseña no coiciden", "Cerrar");
    }
  }
  finish() {
    if (this.show === 2) {
      if (!this.registerFinish.controls['checkTermns'].value) {
        this.alertCtrl.showAlert('Terminos y condiciones', 'Debe Aceptar los terminos y condiciones', 'Cerrar')
      } else {
        this.userTatto.alias = this.registerFinish.controls["alias"].value;
        this.userTatto.ageExp = parseInt(
          this.registerFinish.controls["ageExp"].value
        );
        this.userTatto.phone = parseInt(
          this.registerFinish.controls["phone"].value
        );
        this.userTatto.urlFacebook = this.registerFinish.controls[
          "urlFacebook"
        ].value;
        this.userTatto.urlInstagram = this.registerFinish.controls[
          "urlInstagram"
        ].value;
        this.userRegister(this.userTatto);
      }
    }
  }
  userRegister(data) {
    const load = this.loadingCtrl.create({ content: "Por favor espere..." });
    load.present();
    this.apiRest
      .register(data)
      .then(res => {
        load.dismiss();
        //? setiamos de nuevo el valor a vacio en el formulario
        this.registerForm.controls["name"].setValue("");
        this.registerForm.controls["last_name"].setValue("");
        this.registerForm.controls["email"].setValue("");
        this.registerForm.controls["password"].setValue("");
        this.registerForm.controls["repetPassword"].setValue("");
        this.registerFinish.controls["alias"].setValue("");
        this.registerFinish.controls["ageExp"].setValue("");
        this.registerFinish.controls["phone"].setValue("");
        this.registerFinish.controls["urlFacebook"].setValue("");
        this.registerFinish.controls["urlInstagram"].setValue("");
        if (res.data.code === 201) {
          this.alertCtrl.showAlert(
            null,
            "Gracias por registrarte, en momento un equipo se comunicara o enviara un correo indicandote que has sido aceptado!",
            "Cerrar"
          );
          this.navCtrl.pop();
        } else {
          this.alertCtrl.showAlert(
            null,
            "usuario ya se encuentra registado",
            "Cerrar"
          );
        }
        console.log(res);
      })
      .catch(e => {
        load.dismiss();
        console.error("Error en", e);
      });
  }

  validEmail($e) {
    if (
      !this.registerForm.controls.email.valid &&
      this.registerForm.controls.email.dirty
    ) {
      this.showMessage = 1;
      this.message = "Por favor ingrese un correo electronico valido";
    } else if ($e.ngControl.valid) {
      const body = {
        email: $e.value
      };
      this.apiRest
        .validEmail(body)
        .then(res => {
          if (res.data.code === 200) {
            this.showMessage = 2;
            this.message = "Este correo ya esta en uso";
          } else {
            this.showMessage = 0;
          }
        })
        .catch(e => {
          console.error(e);
        });
    } else {
      this.showMessage = 0;
    }
  }

  termsAndCondition() {
    console.log('check', this.registerFinish.controls['checkTermns'].value)
    if (this.registerFinish.controls['checkTermns'].value) {
      const modal = this.modalCtrl.create("TermsConditionModals");
      modal.present();
    } else {
      this.check = this.registerFinish.controls['checkTermns'].value
    }
  }
}
