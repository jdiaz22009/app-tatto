import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, ToastController, Events } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { AlertProvider } from "../providers/alert";
import { StorageDB } from "../providers/storageDB";
import { NetworkProvider } from "../providers/network";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = "LoginPage";
  @ViewChild(Nav) nav: Nav;
  public pages: Array<{
    title: string;
    iconios: string;
    icon: string;
    component: any;
  }>;
  defaultimg: string = "../assets/imgs/photoDefautlProfile.png";
  alertNetwork: any = null;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertProvider,
    public storageDb: StorageDB,
    public network: NetworkProvider,
    public toastCtrl: ToastController,
    public events: Events
  ) {
    this.menuItem();
    this.initApp();
  }

  initApp() {
    this.platform.ready().then(() => {
      if (this.platform.is("cordova")) {
        this.network.startNetworkMonitor();
        if (!this.network.getType()) {
          this.showToast(
            true,
            "No tienes Internet, revisa tu conexión e intenta de nuevo."
          );
        }
      }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#0000');
      this.splashScreen.hide();
    });
  }
  menuItem() {
    this.pages = [
      {
        title: "Crear orden",
        icon: "md-folder",
        iconios: "ios-folder",
        component: "LoginPage"
      },
      {
        title: "Listar orden",
        icon: "md-list-box",
        iconios: "ios-list-box",
        component: "OrdersPage"
      },
      {
        title: "Mi Perfil",
        icon: "md-contact",
        iconios: "ios-contact",
        component: "LoginPage"
      },
      {
        title: "Mi galeria",
        icon: "md-images",
        iconios: "ios-images",
        component: "LoginPage"
      },
      // {
      //   title: 'Configuración',
      //   icon: 'md-settings',
      //   component: 'LoginPage'
      // },
      {
        title: "Salir",
        icon: "md-log-out",
        iconios: "ios-log-out",
        component: "LoginPage"
      }
    ];
  }

  openPage(page) {
    if (page["title"] === "Salir") {
      this.alertCtrl
        .showAlertConfirm(null, "Esta seguro que desea salir?", "Si", "No")
        .then(res => {
          if (res === 1) {
            this.storageDb.deleteDB();
            this.nav.setRoot(page.component);
          } else {
            this.nav.setRoot("OrdersPage");
          }
        });
    } else {
      this.nav.setRoot(page.component);
    }
  }


  netwokSubscribe() {
    this.events.subscribe("network:offline", () => {
      this.showToast(
        true,
        "No tienes Internet, revisa tu conexión e intenta de nuevo."
      );
    });
    this.events.subscribe("network:online", () => {
      this.showToast(true, "Conexion establecidad");
    });
  }

  showToast(show, msg) {
    if (this.alertNetwork == null) {
      const toast = this.toastCtrl.create({
        message: msg,
        showCloseButton: show
      });
      toast.present();
    }
    if (show) {
      setTimeout(() => {
        if (!this.network.getType()) {
          this.showToast(
            true,
            "No tienes Internet, revisa tu conexión e intenta de nuevo."
          );
        }
      }, 1500);
    }
  }
}
