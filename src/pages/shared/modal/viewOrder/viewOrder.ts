import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ViewController,
  LoadingController,
  NavParams
} from "ionic-angular";

import { FormGroup, FormBuilder } from '@angular/forms';


@IonicPage()
@Component({
  selector: "app-modal-view",
  templateUrl: "viewOrder.html",
})
export class ViewOrder {
  emailValidator = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  formView: FormGroup
  formView2: FormGroup
  notPhoto: string = 'assets/imgs/notimg.png'
  order: any
  user: any
  flagOrder: boolean = false
  constructor(
    public viewCtrl: ViewController,
    public loading: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder
  ) {

    this.formView = this.formBuilder.group({
      name: [''],
      last_name: [''],
      email: [''],
      phone: [''],
      celPhone: [''],
    })

    this.formView2 = this.formBuilder.group({
      nameTatto: [''],
      nameStore: ['']
    })

  }

  ionViewDidLoad() {
    this.order = this.navParams.get('order')
    this.user = this.navParams.get('user')
    this.empetyFormValid(this.order, this.user)
  }

  empetyFormValid(order, user) {
    console.log(this.formView2.controls['nameTatto'].valid, 'valid')
    if (this.formView.controls['name'].valid && this.formView.controls['last_name'].valid && this.formView.controls['email'].valid && this.formView.controls['phone'].valid && this.formView.controls['celPhone'].valid || this.formView2.controls['nameTatto'].valid && this.formView2.controls['nameStore'].valid) {
      this.formView.controls['name'].setValue(order['nameClient'])
      this.formView.controls['last_name'].setValue(order['lastNameClient'])
      this.formView.controls['email'].setValue(order['email'])
      this.formView.controls['phone'].setValue(order['phone'])
      this.formView.controls['celPhone'].setValue(order['celPhone'] ? order['celPhone'] : 0)
      this.formView2.controls['nameTatto'].setValue(user['name'])
      this.formView2.controls['nameStore'].setValue(user['store'] !== '' ? user['store'] : 'No pertenece a ninguna tienda')
      this.flagOrder = true
    }
  }


  update() {
    if (this.flagOrder) {
      this.flagOrder = false
      
    }
  }

  cancel() {
    if (!this.flagOrder) {
      this.flagOrder = true
    }
  }


  close() {
    this.viewCtrl.dismiss();
  }
}
