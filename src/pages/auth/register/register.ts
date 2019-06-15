import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegisterTatto } from '@models/auth';

import { AlertProvider } from '../../../../src/providers/alert'
// import { AlertProvider } from '@providers/alert'



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

export class RegisterPage {
  email_validator = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
  registerForm: FormGroup
  userTatto = {} as RegisterTatto

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertProvider,
    public loadingCtrl: LoadingController,
    private formbuilder: FormBuilder,

  ) {
    this.registerForm = this.formbuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.pattern(this.email_validator)
      ])],
      password: ['', Validators.required],
      repetPassword: ['', Validators.required]
    })
  }

  UserValid() {
    const load = this.loadingCtrl.create({ content: 'Espere...' })
    load.present()
    if (this.registerForm.controls['repetPassword'].value === this.registerForm.controls['password'].value) {
      this.userTatto.name = this.registerForm.controls['name'].value
      this.userTatto.last_name = this.registerForm.controls['last_name'].value
      this.userTatto.email = this.registerForm.controls['email'].value
      this.userTatto.password = this.registerForm.controls['password'].value
      console.log(JSON.stringify(this.userTatto))
    } else {
      load.dismiss()
      this.alertCtrl.showAlert('Aviso!', 'Contraseña no coiciden', 'Cerrar')
    }

  }
}