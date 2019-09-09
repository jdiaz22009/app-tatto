import { Component } from "@angular/core";
import { IonicPage, LoadingController, NavController } from "ionic-angular";

import { tattoReqProvider } from "../../../providers/api/tattoReq";
import { AlertProvider } from '../../../providers/alert';

@IonicPage()
@Component({
  selector: "page-order",
  templateUrl: "orders.html"
})
export class OrdersPage {
  tattoArreglo: any;
  constructor(
    public tattoReq: tattoReqProvider,
    public loading: LoadingController,
    public alertCtrl: AlertProvider,
    public navCtrl: NavController
  ) { }

  ionViewDidLoad() {
    this.getOrdersTatto();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
      this.getOrdersTatto()
    }, 2000);
  }

  async getOrdersTatto() {
    const load = this.loading.create({})
    load.present();
    const getOrders = await this.tattoReq.getOrdersTatto();
    try {
      if (getOrders !== null && getOrders !== undefined) {
        if (getOrders["data"]["code"] === 200) {
          load.dismiss()
          const orders = getOrders["data"]["findOrder"]["orderWork"];
          const arreglo = [];
          for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            if (order["state"]) {
              console.log(order)
              arreglo.push(order);
            }
          }
          this.tattoArreglo = arreglo;
        }else if( getOrders["data"]["code"] === 404){
          load.dismiss()
          this.alertCtrl.showAlert(null, 'No hay ordenes registrada', 'Cerrar')
        }
      }
    } catch (error) {
      load.dismiss()
      console.error("error en el servidor", error);
      this.alertCtrl.showAlert(null, 'Hubo un erro al cargar las ordenes, intente mas tarde', 'Cerrar')

    }
  }

  nextCreateOrder() {
    this.navCtrl.push('RegisterOrdersPage')
  }
}
