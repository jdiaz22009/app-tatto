import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network";
import { ToastController } from "ionic-angular";

@Injectable()
export class NetworkProvider {
  disconnectSubscription: any;
  connectSubscription: any;

  constructor(public network: Network, public toastCtrl:ToastController) {}

  startNetworkMonitor() {
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log("network was disconnected :-(");
      this.showToast('Telefono sin conexion')

    });
    this.connectSubscription = this.network.onConnect().subscribe(() => {
      console.log("network connected! :-)");
      setTimeout(() => {
        if (
          this.network.type === "wifi" ||
          this.network.type === "2g" ||
          this.network.type === "3g" ||
          this.network.type === "4g"
        ) {
          console.log(this.network.type + " network connection");
          this.showToast('Conectado')
        } else if (this.network.type === "none") {
          console.log("none network");
        }
      }, 3000);
    });
  }

  stopNetWorkMonitor() {
    this.disconnectSubscription.unsubscribe();
    this.connectSubscription.unsubscribe();
  }

  getType() {
    if (this.network.type === "none") {
      return false;
    }
    return true;
  }

  showToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
