import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ViewController,
  LoadingController,
  NavParams
} from "ionic-angular";

import { FormGroup, FormBuilder } from "@angular/forms";

import { tattoReqProvider } from "../../../../providers/api/tattoReq";
import { AlertProvider } from "../../../../providers/alert";

@IonicPage()
@Component({
  selector: "app-modal-view",
  templateUrl: "viewOrder.html"
})
export class ViewOrder {
  emailValidator = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  formView: FormGroup;
  formView2: FormGroup;
  notPhoto: string = "assets/imgs/notimg.png";
  order: any;
  user: any;
  flagOrder: boolean = false;
  constructor(
    public viewCtrl: ViewController,
    public loading: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public apiRest: tattoReqProvider,
    public alertCtrl: AlertProvider
  ) {
    this.formView = this.formBuilder.group({
      nameClient: [""],
      lastNameClient: [""],
      email: [""],
      phone: [""],
      celPhone: [""],
      document: [0],
      skup_order: [0]
    });

    this.formView2 = this.formBuilder.group({
      nameTatto: [""],
      nameStore: [""]
    });
  }

  ionViewDidLoad() {
    this.order = this.navParams.get("order");
    this.user = this.navParams.get("user");
    this.empetyFormValid(this.order, this.user);
  }

  empetyFormValid(order, user) {
    console.log(this.formView2.controls["nameTatto"].valid, "valid");
    if (
      (this.formView.controls["nameClient"].valid &&
        this.formView.controls["lastNameClient"].valid &&
        this.formView.controls["email"].valid &&
        this.formView.controls["phone"].valid &&
        this.formView.controls["celPhone"].valid) ||
      (this.formView2.controls["nameTatto"].valid &&
        this.formView2.controls["nameStore"].valid)
    ) {
      this.formView.controls["skup_order"].setValue(order["skup_order"]);
      this.formView.controls["nameClient"].setValue(order["nameClient"]);
      this.formView.controls["lastNameClient"].setValue(
        order["lastNameClient"]
      );
      this.formView.controls["email"].setValue(order["email"]);
      this.formView.controls["phone"].setValue(order["phone"]);
      this.formView.controls["celPhone"].setValue(
        order["celPhone"] ? order["celPhone"] : 0
      );
      this.formView.controls["document"].setValue(order["document"]);
      this.formView2.controls["nameTatto"].setValue(user["name"]);
      this.formView2.controls["nameStore"].setValue(
        user["store"] !== "" ? user["store"] : "No pertenece a ninguna tienda"
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

  async updateOrder() {
    const loading = this.loading.create({ content: "Actualizando..." });
    loading.present();
    const params = {
      document: this.formView.controls["document"].value,
      nameClient: this.formView.controls["nameClient"].value,
      lastNameClient: this.formView.controls["lastNameClient"].value,
      email: this.formView.controls["email"].value,
      phone: this.formView.controls["phone"].value,
      skup_order: this.order["skup_order"]
    };
    try {
      const update = await this.apiRest.orderViewUpdat(params);
      console.log(update, "update");
      if (update && update["data"]["code"] === 200) {
        loading.dismiss();
        this.navCtrl.pop()
      } else {
        loading.dismiss();
        this.alertCtrl.showAlert(null, "Hubo un error", "Cerrar");
      }
    } catch (error) {
      console.error(error, "error");
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
