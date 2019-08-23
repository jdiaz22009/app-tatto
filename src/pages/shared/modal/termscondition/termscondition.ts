import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'terms-condition',
  templateUrl: 'termscondition.html'
})

export class TermsConditionModals{

  titleTerms:string = 'TERMINOS Y CONDICIONES DE USO'

  constructor(
    public viewCtrl:ViewController
  ){

  }

  close() {
    this.viewCtrl.dismiss();
  }
}