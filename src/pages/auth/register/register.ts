import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegisterTatto } from '@models/auth';

import { AlertProvider } from '../../../../src/providers/alert'
import { authTattoProvider } from '../../../../src/providers/api/authTatto';
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
    public apiRest:authTattoProvider,
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

  userValid() {
    if (this.registerForm.controls['repetPassword'].value === this.registerForm.controls['password'].value) {
      this.userTatto.name = this.registerForm.controls['name'].value
      this.userTatto.last_name = this.registerForm.controls['last_name'].value
      this.userTatto.email = this.registerForm.controls['email'].value
      this.userTatto.password = this.registerForm.controls['password'].value
      this.userRegister(this.userTatto)
    } else {
      this.alertCtrl.showAlert('Aviso!', 'Contraseña no coiciden', 'Cerrar')
    }

  }

  userRegister(data){
    const load = this.loadingCtrl.create({ content: 'Por favor espere...' })
    load.present()
    this.apiRest.register(data)
    .then(res =>{
      load.dismiss()
      //? setiamos de nuevo el valor a vacio en el formulario
      this.registerForm.controls['name'].setValue('')
      this.registerForm.controls['last_name'].setValue('')
      this.registerForm.controls['email'].setValue('')
      this.registerForm.controls['password'].setValue('')
      this.registerForm.controls['repetPassword'].setValue('')
      console.log(res)
    })
    .catch(e => {
      load.dismiss()
      console.error('Error en', e)
    })
  }


}