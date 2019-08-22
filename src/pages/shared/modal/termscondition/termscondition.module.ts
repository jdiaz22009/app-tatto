import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsConditionModals } from './termscondition';
@NgModule({
  declarations:[
    TermsConditionModals,
  ],
  imports: [
    IonicPageModule.forChild(TermsConditionModals),
  ],
})

export class TermsConditionModalsPageModule {}