import { Injectable } from "@angular/core";
import { decode } from "jwt-simple";
import moment from "moment";

@Injectable()
export class Authjwt {
  secre_token: string = "D4TAP4R4L0G1N04UTH";
  flagAuth: boolean = false;

  public authToken(token) {
    console.log("token", token);
    if (token === null) {
      return false;
    } else {
      try {
        const payload = decode(token, this.secre_token);
        if (payload["exp"] <= moment().unix()) {
          console.log("token a caducado");
          return false;
        } else {
          console.log("token vigente");
          return true;
        }
      } catch (error) {
        console.error(error, "error en");
        return false;
      }
    }
  }
}
