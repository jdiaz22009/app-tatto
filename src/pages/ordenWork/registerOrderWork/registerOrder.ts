import { Component } from "@angular/core";
import { IonicPage, ModalController } from "ionic-angular";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@IonicPage()
@Component({
  selector: "page-Registerorder",
  templateUrl: "registerOrder.html"
})
export class RegisterOrdersPage {


  formRegisterOrder:FormGroup
  typeDocument: any = [
    {
      name: 'C.C - Cedula',
      value: 'Cedula'
    },
    {
      name: 'T.I - Tarjeta de identidad',
      value: 'Tareta de identidad'
    }
  ]
  check: boolean = false;
  kidsAndAdult: number

  constructor(
    public modalCtrl:ModalController,
    public formBuilder:FormBuilder

  ) {
    this.formRegisterOrder = this.formBuilder.group({
      checkTermns: [false, Validators.required]
    })
   }

  ionViewDidLoad() {
    this.kidsAndAdult = 0
  }


  ionChangeCheck($event) {
    if ($event === 'Cedula') {
      this.kidsAndAdult = 1
    } else {
      this.kidsAndAdult = 0
    }
  }

  termsAndCondition() {
    console.log('check', this.formRegisterOrder.controls['checkTermns'].value)
    if (this.formRegisterOrder.controls['checkTermns'].value) {
      const modal = this.modalCtrl.create("TermsConditionModals", { mode: 2 });
      modal.present();
    } else {
      this.check = this.formRegisterOrder.controls['checkTermns'].value
    }
  }

}
