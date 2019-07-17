import { Injectable } from "@angular/core";
import { decode } from "jwt-simple";
import moment from "moment";

import { CONFIGURL } from "./configUrl";
import { StorageDB } from "../providers/storageDB";

@Injectable()
export class Authjwt {
  secre_token: string = CONFIGURL.api.secret_token;
  flagAuth: boolean = false;

  constructor(
    public storageDB:StorageDB
  ){

  }

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
        this.storageDB.deleteDB()
        console.error(error, "error en");
        return false;
      }
    }
  }
}
