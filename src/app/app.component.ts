import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, ToastController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { AlertProvider } from "../providers/alert";
import { StorageDB } from "../providers/storageDB";
import { NetworkProvider } from "../providers/network";

import { FIREBASE_CONFIG } from "./app.firebase.config";
import * as firebase from "firebase";

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
  user: any = null;
  data: any = {};
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertProvider,
    public storageDb: StorageDB,
    public network: NetworkProvider,
    public toastCtrl: ToastController
  ) {
    this.menuItem();
    this.initApp();
  }

  initApp() {
    this.platform.ready().then(async () => {
      if (this.platform.is("cordova")) {
        this.network.startNetworkMonitor();
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      firebase.initializeApp(FIREBASE_CONFIG);
      this.statusBar.backgroundColorByHexString("#0000");
      this.splashScreen.hide();
      this.user = await this.getUser();
      this.data["name"] = this.user["name"];
      this.data["last_name"] = this.user["last_name"];
    });
  }
  menuItem() {
    this.pages = [
      {
        title: "Crear orden",
        icon: "md-folder",
        iconios: "ios-folder",
        component: "RegisterOrdersPage"
      },
      {
        title: "Listar orden",
        icon: "md-list-box",
        iconios: "ios-list-box",
        component: "OrdersPage"
      },
      /*{
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
      },*/
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

  async getUser() {
    const user = await this.storageDb.getItem("users");
    return user !== undefined && user !== null ? user : false;
  }

  openPage(page) {
    if (page["title"] === "Salir") {
      this.alertCtrl
        .showAlertConfirm(null, "Esta seguro que desea salir?", "Si", "No")
        .then(res => {
          if (res === 1) {
            this.storageDb.deleteDB();
            this.nav.setRoot(page.component);
            this.network.disconnectSubscription();
          } else {
            this.nav.setRoot("OrdersPage");
          }
        });
    } else {
      this.nav.setRoot(page.component);
    }
  }
}
