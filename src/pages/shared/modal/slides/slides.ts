import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ViewController,
  LoadingController
} from "ionic-angular";
import { tattoReqProvider } from "../../../../providers/api/tattoReq";
import { AlertProvider } from "../../../../providers/alert";
import { StorageDB } from "../../../../providers/storageDB";

@IonicPage()
@Component({
  selector: "slides-app",
  templateUrl: "slides.html"
})
export class SlidesPages {
  guides: any = [];
  constructor(
    public viewCtrl: ViewController,
    public loading: LoadingController,
    public tattoReq: tattoReqProvider,
    public alertCtrl: AlertProvider,
    public storageDb: StorageDB,
    public navCtrl: NavController
  ) {}

  ionViewDidLoad() {
    this.getGuide();
  }

  async getGuide() {
    const getGuide = await this.tattoReq.getGudies();
    if (getGuide["data"] && getGuide["data"]["code"] === 200) {
      this.guides = getGuide["data"]["guideFind"];
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
