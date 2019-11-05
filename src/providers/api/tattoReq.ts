import { CONFIGURL } from "./../configUrl";
import { Injectable } from "@angular/core";

import { ApiRestClientProvider } from "./apiRest";
import { StorageDB } from "../storageDB";

@Injectable()
export class tattoReqProvider {
  apiUrl: string = CONFIGURL.api.url;
  getOrders: string = CONFIGURL.api.tatto.GET.getOrdersTatto;
  createOrder: string = CONFIGURL.api.tatto.POST.registerOrder;
  orderViewUpdate: string = CONFIGURL.api.tatto.POST.orderViewUpdate;
  getGuie: string = CONFIGURL.api.tatto.GET.getGuide;

  constructor(
    public apiRes: ApiRestClientProvider,
    public storageDB: StorageDB
  ) {}

  async getToken() {
    return await this.storageDB.getItem("token");
  }

  async getOrdersTatto() {
    const url = this.apiUrl + this.getOrders;
    const token = await this.getToken();
    const headers = {
      headers: { Authorization: token, "content-type": "application/json" }
    };
    try {
      return await this.apiRes.get(url, null, headers);
    } catch (error) {
      throw error;
    }
  }

  async getGudies() {
    const url = this.apiUrl + this.getGuie;
    const token = await this.getToken();
    const headers = {
      headers: { Authorization: token, "content-type": "application/json" }
    };
    try {
      return await this.apiRes.get(url, null, headers);
    } catch (error) {
      throw error;
    }
  }

  async createRegisterOrder(params) {
    const url = this.apiUrl + this.createOrder;
    const token = await this.getToken();
    const header = { Authorization: token, "content-type": "application/json" };
    try {
      return await this.apiRes.requestHttp("POST", url, params, header);
    } catch (error) {
      throw error;
    }
  }

  async orderViewUpdat(params) {
    const url = this.apiUrl + this.orderViewUpdate;
    const token = await this.getToken();
    const header = { Authorization: token, "content-type": "application/json" };
    try {
      return await this.apiRes.requestHttp("POST", url, params, header);
    } catch (error) {
      throw error;
    }
  }
}
