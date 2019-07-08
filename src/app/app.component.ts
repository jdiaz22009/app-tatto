import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = "LoginPage";
  @ViewChild(Nav) nav: Nav;
  public pages: Array<{ title: string; icon: string; component: any }>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    this.menuItem()
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  menuItem() {
    this.pages = [
      {
        title: 'Crear orden',
        icon: 'md-folder',
        component: 'LoginPage'
      },
      {
        title: 'Listar orden',
        icon: 'md-list-box',
        component: 'LoginPage'
      },
      {
        title: 'Mi galeria',
        icon: 'md-images',
        component: 'LoginPage'
      },
      // {
      //   title: 'Configuración',
      //   icon: 'md-settings',
      //   component: 'LoginPage'
      // },
      {
        title: 'Salir',
        icon: 'md-log-out',
        component: 'LoginPage'
      }
    ];
  }

  openPage(page){
    this.nav.setRoot(page.component)
  }

}
