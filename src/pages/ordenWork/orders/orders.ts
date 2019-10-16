import { Component } from "@angular/core";
import {
  IonicPage,
  LoadingController,
  NavController,
  ModalController
} from "ionic-angular";

import { tattoReqProvider } from "../../../providers/api/tattoReq";
import { AlertProvider } from "../../../providers/alert";

@IonicPage()
@Component({
  selector: "page-order",
  templateUrl: "orders.html"
})
export class OrdersPage {
  tattoArreglo: any;
  userTatto: any;
  constructor(
    public tattoReq: tattoReqProvider,
    public loading: LoadingController,
    public alertCtrl: AlertProvider,
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    this.getOrdersTatto();
  }
  doRefresh(refresher) {
    console.log("Begin async operation", refresher);

    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
      this.getOrdersTatto();
    }, 2000);
  }

  async getOrdersTatto() {
    const load = this.loading.create({});
    load.present();
    const getOrders = await this.tattoReq.getOrdersTatto();
    try {
      if (getOrders !== null && getOrders !== undefined) {
        if (getOrders["data"]["code"] === 200) {
          load.dismiss();
          const userTatto = [];
          const arreglo = [];
          const orders = getOrders["data"]["findOrder"]["orderWork"];
          const user = getOrders["data"]["findOrder"]["id_user"];
          this.userTatto = user;
          userTatto.push(user);
          for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            if (order["state"]) {
              arreglo.push(order);
            }
          }
          this.tattoArreglo = arreglo;
        } else if (getOrders["data"]["code"] === 404) {
          load.dismiss();
          this.alertCtrl.showAlert(null, "No hay ordenes registrada", "Cerrar");
        }
      }
    } catch (error) {
      load.dismiss();
      console.error("error en el servidor", error);
      this.alertCtrl.showAlert(
        null,
        "Hubo un erro al cargar las ordenes, intente mas tarde",
        "Cerrar"
      );
    }
  }

  nextCreateOrder() {
    this.navCtrl.push("RegisterOrdersPage");
  }

  viewOrder(order) {
    console.log(JSON.stringify(order), "order", JSON.stringify(this.userTatto));
    const view = {
      order,
      user: this.userTatto
    };
    const modal = this.modalCtrl.create("ViewOrder", view);
    modal.present();
  }
}
