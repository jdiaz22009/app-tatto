import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'terms-condition',
  templateUrl: 'termscondition.html'
})

export class TermsConditionModals {

  titleTerms: string
  mode:number

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    if (this.navParams.get('mode') === 1) {
      this.titleTerms = 'TERMINOS Y CONDICIONES DE USO'
      this.mode = this.navParams.get('mode')
    }else if(this.navParams.get('mode') === 2){
      this.titleTerms = 'TERMINOS Y CONDICIONES DEL SERVICIOS'
      this.mode = this.navParams.get('mode')
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }
}