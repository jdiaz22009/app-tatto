import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  ViewController,
  LoadingController,
  ActionSheetController,
  NavParams
} from 'ionic-angular';

import { FormGroup, FormBuilder } from '@angular/forms';

import { tattoReqProvider } from '../../../../providers/api/tattoReq';
import { AlertProvider } from '../../../../providers/alert';
import { FirebaseProvider } from '../../../../providers/firebase';
import { StorageDB } from '../../../../providers/storageDB';
import { MediaProvider } from '../../../../providers/media';

@IonicPage()
@Component({
  selector: 'app-modal-view',
  templateUrl: 'viewOrder.html'
})
export class ViewOrder {
  emailValidator = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  formView: FormGroup;
  formView2: FormGroup;
  notPhoto: string = './assets/imgs/notimg.png';
  startImgTatto: string = this.notPhoto;
  endImgTatto: string = this.notPhoto;
  order: any;
  user: any;
  pictureObj: any = [{ name: 'startImgTatto' }, { name: 'endImgTatto' }];
  flagOrder: boolean = false;
  constructor(
    public viewCtrl: ViewController,
    public loading: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public apiRest: tattoReqProvider,
    public alertCtrl: AlertProvider,
    public fire: FirebaseProvider,
    public actionSheetCtrl: ActionSheetController,
    public storageDB: StorageDB,
    public mediaProvider: MediaProvider
  ) {
    this.formView = this.formBuilder.group({
      nameClient: [''],
      lastNameClient: [''],
      email: [''],
      phone: [''],
      celPhone: [''],
      document: [0],
      skup_order: [0]
    });

    this.formView2 = this.formBuilder.group({
      nameTatto: [''],
      nameStore: ['']
    });
  }

  ionViewDidLoad() {
    this.order = this.navParams.get('order');
    this.user = this.navParams.get('user');
    this.empetyFormValid(this.order, this.user);
    this.getProfilePicture();
  }

  empetyFormValid(order, user) {
    if (
      (this.formView.controls['nameClient'].valid &&
        this.formView.controls['lastNameClient'].valid &&
        this.formView.controls['email'].valid &&
        this.formView.controls['phone'].valid &&
        this.formView.controls['celPhone'].valid) ||
      (this.formView2.controls['nameTatto'].valid &&
        this.formView2.controls['nameStore'].valid)
    ) {
      this.formView.controls['skup_order'].setValue(order['skup_order']);
      this.formView.controls['nameClient'].setValue(order['nameClient']);
      this.formView.controls['lastNameClient'].setValue(
        order['lastNameClient']
      );
      this.formView.controls['email'].setValue(order['email']);
      this.formView.controls['phone'].setValue(order['phone']);
      this.formView.controls['celPhone'].setValue(
        order['celPhone'] ? order['celPhone'] : 0
      );
      this.formView.controls['document'].setValue(order['document']);
      this.formView2.controls['nameTatto'].setValue(user['name']);
      this.formView2.controls['nameStore'].setValue(
        user['store'] !== '' ? user['store'] : 'No pertenece a ninguna tienda'
      );
      this.flagOrder = true;
    }
  }

  update() {
    if (this.flagOrder) {
      this.flagOrder = false;
    }
  }

  cancel() {
    if (!this.flagOrder) {
      this.flagOrder = true;
    }
  }

  async getUserId() {
    return await this.storageDB.getItem('users');
  }
  async getProfilePicture() {
    const loader = this.loading.create({});
    loader.present();
    const userId = await this.getUserId();
    this.fire
      .getProfilePicture(0, userId['_id'])
      .then(res => {
        if (res !== null) {
          console.log('res', res);
          this.pictureObj.map(picture => {
            if (
              res[picture.name] !== undefined &&
              res[picture.name].includes('http')
            ) {
              this[picture.name] = res[picture.name];
            }
          });
        }
        loader.dismiss();
      })
      .catch(e => {
        loader.dismiss();
        console.error('error ' + e);
      });
  }

  async updateOrder() {
    const loading = this.loading.create({ content: 'Actualizando...' });
    loading.present();
    let arrayImgs = [];
    let dataArray = {};
    const userId = await this.getUserId();
    const params = {
      document: this.formView.controls['document'].value,
      nameClient: this.formView.controls['nameClient'].value,
      lastNameClient: this.formView.controls['lastNameClient'].value,
      email: this.formView.controls['email'].value,
      phone: this.formView.controls['phone'].value,
      skup_order: this.order['skup_order']
    };
    try {
      const update = await this.apiRest.orderViewUpdat(params);
      console.log(update, 'update');
      if (update && update['data']['code'] === 200) {
        this.pictureObj.map(obj => {
          if (
            this[obj.name] != this.notPhoto &&
            this.isBase64Img(this[obj.name])
          ) {
            arrayImgs.push({
              model: this[obj.name],
              id: userId['_id'],
              name: obj.name,
              id_order: update['data']['upOrder']['_id']
            });
          } else {
            dataArray[obj.name] =
              this[obj.name] === this.notPhoto ? null : this[obj.name];
          }
        });

        const results = arrayImgs.map(obj => {
          const img = obj.model.substring(23);
          return this.fire
            .uploadPicture(img, obj)
            .then(res => {
              dataArray = {
                model: obj.name,
                id: obj.id,
                name: obj.name
              };
              return (dataArray[obj.name] = res);
            })
            .catch(e => {
              console.error('error upload ' + e.message);
              loading.dismiss();
              this.alertCtrl.showAlert(
                'Error',
                'Ha ocurrido un problema al subir la imagen, por favor intente de nuevo',
                'Cerrar'
              );
            });
        });

        if (arrayImgs.length > 0) {
          const loa = this.loading.create({
            content: 'Subiendo imagen...'
          });
          loa.present();
          this.fire
            .savePicture(0, dataArray, userId['_id'])
            .then(() => {
              loa.dismiss();
              this.alertCtrl.showAlert(
                'Exito',
                'La Foto ha sido guardado correctamente',
                'Cerrar'
              );
            })
            .catch(e => {
              console.error('Error en:', e);
              loa.dismiss();
              this.alertCtrl.showAlert(
                'Error',
                'Ha ocurrido un problema, por favor intente de nuevo',
                'Cerrar'
              );
            });
        }

        Promise.all(results).then(completed => {
          console.log('completed ' + completed);
          loading.dismiss();
          this.navCtrl.pop();
        });
      } else {
        loading.dismiss();
        this.alertCtrl.showAlert(null, 'Hubo un error', 'Cerrar');
      }
    } catch (error) {
      console.error(error, 'error');
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
            this.takePicture(id, 1);
          }
        },
        {
          text: 'Seleccionar de Galería',
          role: 'takePicture',
          handler: () => {
            this.takePicture(id, 0);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  isBase64Img(str) {
    try {
      return str.includes('data:image/jpeg;base64');
    } catch (e) {
      return false;
    }
  }

  takePicture(modelPicture, mode) {
    this.mediaProvider
      .takePicture(mode)
      .then(res => {
        this[modelPicture] = res;
        console.log(res);
      })
      .catch(e => {
        console.error(e);
      });
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
