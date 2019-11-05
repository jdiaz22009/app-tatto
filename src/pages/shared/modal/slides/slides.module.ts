import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlidesPages } from './slides';
@NgModule({
  declarations:[
    SlidesPages,
  ],
  imports: [
    IonicPageModule.forChild(SlidesPages),
  ],
})

export class SlidesPageModule {}
