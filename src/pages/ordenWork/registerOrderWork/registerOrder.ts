import { Component } from "@angular/core";
import { IonicPage, ModalController, LoadingController, NavController, ActionSheetController } from "ionic-angular";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AlertProvider } from '../../../providers/alert';
import { tattoReqProvider } from '../../../providers/api/tattoReq';
import { MediaProvider } from '../../../providers/media';


@IonicPage()
@Component({
  selector: "page-Registerorder",
  templateUrl: "registerOrder.html"
})
export class RegisterOrdersPage {

  notImg: string = 'assets/imgs/notimg.png'
  startImgTatto: string = this.notImg
  endImgTatto: string = this.notImg
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
    public actionSheetCtrl: ActionSheetController,
    public mediaProvider: MediaProvider
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

  setPicture(id) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Subir foto',
      buttons: [
        {
          text: 'Tomar Foto',
          role: 'takePicture',
          handler: () => {
            this.takePicture(id, 1)
          }
        },
        {
          text: 'Seleccionar de Galería',
          role: 'takePicture',
          handler: () => {
            this.takePicture(id, 0)
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked')
          }
        }
      ]
    })
    actionSheet.present()
  }

  takePicture(modelPicture, mode) {
    this.mediaProvider.takePicture(mode).then(res => {
      console.log(res)
    }).catch(e => {
      console.error(e)
    })
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
      orderWork: this.formRegisterOrder.value,
      checkTermns: this.formRegisterOrder.controls['checkTermns']
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
