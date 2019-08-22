import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterOrdersPage } from './registerOrder';

@NgModule({
  declarations:[
    RegisterOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterOrdersPage),
  ],
})

export class RegisterOrdersPageModule {}