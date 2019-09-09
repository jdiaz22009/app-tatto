import { Component } from "@angular/core";
import { IonicPage, ModalController, LoadingController, NavController, ActionSheetController } from "ionic-angular";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AlertProvider } from '../../../providers/alert';
import { tattoReqProvider } from '../../../providers/api/tattoReq';
import { MediaProvider } from '../../../providers/media';
import { StorageDB } from '../../../providers/storageDB';
import { FirebaseProvider } from '../../../providers/firebase';


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

  objImg = [
    { name: 'startImgTatto' },
    { name: 'endImgTatto' },
  ]

  pictureMode: number = 0

  constructor(
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertProvider,
    private httpApi: tattoReqProvider,
    public loading: LoadingController,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public mediaProvider: MediaProvider,
    public storageDB: StorageDB,
    public fire: FirebaseProvider
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

  async getUserId() {
    return await this.storageDB.getItem('users')
  }


  // async getProfilePicture() {
  //   const loader = this.loading.create({})
  //   loader.present()
  //   const userId = await this.getUserId()

  //   this.fire.getProfilePicture(this.pictureMode, userId['_id']).then(res => {

  //     if (res !== null) {
  //       this.objImg.map(picture => {
  //         if (res[picture.name] !== undefined && res[picture.name].includes('http')) {
  //           this[picture.name] = res[picture.name]
  //         }
  //       })
  //     }
  //     loader.dismiss()
  //   }).catch(e => {
  //     loader.dismiss()
  //     console.error('error ' + e)
  //   })
  // }


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

  isBase64Img(str) {
    try {
      return str.includes('data:image/jpeg;base64')
    } catch (e) {
      return false
    }
  }


  takePicture(modelPicture, mode) {
    this.mediaProvider.takePicture(mode).then(res => {
      this[modelPicture] = res
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

    const userId = await this.getUserId()

    let arrayImgs = []

    let dataArray = {}

    const loading = this.loading.create({ content: 'Creando orden...' })
    const params = {
      orderWork: this.formRegisterOrder.value,
      checkTermns: this.formRegisterOrder.controls['checkTermns'].value
    }

    console.log('params', JSON.stringify(params))
    if (this.formRegisterOrder.controls['checkTermns'].value) {
      loading.present();
      try {
        const createOrder = await this.httpApi.createRegisterOrder(params)
        if (createOrder) {
          if (createOrder['data'] && createOrder['data']['code'] === 201) {
            this.objImg.map(obj => {
              if (this[obj.name] != this.notImg && this.isBase64Img(this[obj.name])) {
                arrayImgs.push({ model: this[obj.name], id: userId['_id'], name: obj.name })
              } else {
                dataArray[obj.name] = this[obj.name] === this.notImg ? null : this[obj.name]
              }
            })
            const results = arrayImgs.map(obj => {
              const img = obj.model.substring(23)
              return this.fire.uploadPicture(img, obj.id, obj.name).then(res => {
                return dataArray[obj.name] = res
              }).catch(e => {
                console.error('error upload ' + e.message)
                loading.dismiss()
                this.alertCtrl.showAlert('Error', 'Ha ocurrido un problema al subir la imagen, por favor intente de nuevo', 'Cerrar')
              })
            })
            Promise.all(results).then(completed => {
              console.log('completed ' + completed)
              loading.dismiss()
              this.navCtrl.setRoot('OrdersPage')
            })

          } else {
            loading.dismiss()
            console.error('Error', createOrder)
          }
        } else {
          loading.dismiss()
          console.error(createOrder)
        }
        console.log(JSON.stringify(createOrder))
      } catch (error) {
        console.error(error)
        loading.dismiss()
        this.alertCtrl.showAlert(null, 'Error al crear la orden', 'Cerrar')
      }
    } else {
      this.alertCtrl.showAlert(null, 'Debe aceptar los terminos y condiciones', 'Cerrar')
    }
  }

}
