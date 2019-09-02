import { Component } from "@angular/core";
import { IonicPage, ModalController, LoadingController, NavController } from "ionic-angular";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AlertProvider } from '../../../providers/alert';
import { tattoReqProvider } from '../../../providers/api/tattoReq';


@IonicPage()
@Component({
  selector: "page-Registerorder",
  templateUrl: "registerOrder.html"
})
export class RegisterOrdersPage {


  formRegisterOrder: FormGroup
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
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertProvider,
    private httpApi: tattoReqProvider,
    public loading: LoadingController,
    public navCtrl: NavController,

  ) {
    this.formRegisterOrder = this.formBuilder.group({
      nameClient: [''],
      lastNameClient: [''],
      address: [''],
      email: [''],
      type_document: [''],
      document: [''],
      phone: [''],
      age: [''],
      numberSession: [''],
      priceTatto: [''],
      deposit: [''],
      nameTutor: [''],
      lastNameTutor: [''],
      phoneTutor: [''],
      checkTermns: [false, Validators.required],

    })
  }

  ionViewDidLoad() {
    this.kidsAndAdult = 0
  }


  ionChangeCheck($event) {
    if ($event === 'Tareta de identidad') {
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

  async createOrder() {
    const loading = this.loading.create({ content: 'Creando...' })
    const params = {
      orderWork: this.formRegisterOrder.value
    }
    if (this.formRegisterOrder.controls['checkTermns'].value) {
      loading.present();
      const createOrder = await this.httpApi.createRegisterOrder(params)
      if (createOrder) {
        if (createOrder['data'] && createOrder['data']['code'] === 201) {
          loading.dismiss()
          this.navCtrl.setRoot('OrdersPage')
        } else {
          loading.dismiss()
          console.error('Error', createOrder)
        }
      } else {
        loading.dismiss()
        console.error(createOrder)
      }
      console.log(JSON.stringify(createOrder))
    } else {
      this.alertCtrl.showAlert(null, 'Debe aceptar los terminos y condiciones', 'Cerrar')
    }
  }

}
