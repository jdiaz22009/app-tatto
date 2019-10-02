import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ViewOrder } from './viewOrder';
@NgModule({
  declarations: [
    ViewOrder,
  ],
  imports: [
    IonicPageModule.forChild(ViewOrder),
  ],
})

export class ForgotPasswordPageModule { }