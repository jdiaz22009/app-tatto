import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotPassword } from './forgotPassword';
@NgModule({
  declarations:[
    ForgotPassword,
  ],
  imports: [
    IonicPageModule.forChild(ForgotPassword),
  ],
})

export class ForgotPasswordPageModule {}