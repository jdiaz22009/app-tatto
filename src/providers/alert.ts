import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertProvider {
  
  constructor(public alertctrl: AlertController) {
  }

  showAlert(title, message, nameButton) {
    const alert = this.alertctrl.create({
      title: title,
      subTitle: message,
      buttons: [nameButton]
    })
    alert.present()
  }

  showAlertConfirm(title,message,ok,cancel){
    return new Promise(resolve =>{
      const confirm = this.alertctrl.create({
        title: title,
        message: message,
        buttons:[{
          text: ok,
          handler: () =>{
            resolve(1)
          }
        },
        {
          text:cancel,
          handler:() =>{
            resolve(0)
          }
        }
      ],
      enableBackdropDismiss: false
      })
      confirm.present()
    })
  }

}