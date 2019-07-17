import { Injectable } from "@angular/core";

import { CONFIGURL } from "../configUrl";

import { ApiRestClientProvider } from "./apiRest";
import { StorageDB } from "../storageDB";

@Injectable()
export class tattoReqProvider {
  apiUrl: string = CONFIGURL.api.url;
  getOrders: string = CONFIGURL.api.tatto.GET.getOrdersTatto;

  constructor(
    public apiRes: ApiRestClientProvider,
    public storageDB: StorageDB
  ) {}

  async getToken() {
    return await this.storageDB.getItem("token");
  }

  async getOrdersTatto(){
    const url = this.apiUrl + this.getOrders
    const token = await this.getToken()
    const headers = { headers: {'Authorization' : token, 'content-type': 'application/json' }}
    try {
      return await this.apiRes.get(url,null,headers)
    } catch (error) {
      throw error
    }
  }
}
