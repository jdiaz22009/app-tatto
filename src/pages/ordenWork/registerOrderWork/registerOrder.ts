import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";


@IonicPage()
@Component({
  selector: "page-Registerorder",
  templateUrl: "registerOrder.html"
})
export class RegisterOrdersPage {

  typeDocument: any = [
    {
      name: 'C.C - Cedula',
      value: 'Cedula'
    },
    {
      name: 'T.I - Tarjeta de identidad',
      value: 'Tareta de identidad'
    }
  ]

  kidsAndAdult: number



  constructor() { }

  ionViewDidLoad() {
    this.kidsAndAdult = 0
  }


  ionChangeCheck($event) {
    console.log('Event to method', $event)
    if ($event === 'Cedula') {
      this.kidsAndAdult = 1
    } else {
      this.kidsAndAdult = 0
    }
  }

}
