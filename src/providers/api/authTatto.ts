import { Injectable } from "@angular/core";

import { CONFIGURL } from "../configUrl";

import { ApiRestClientProvider } from "./apiRest";
import { StorageDB } from "../storageDB";

@Injectable()
export class authTattoProvider {
  apiUrl: string = CONFIGURL.api.url;

  postRegisterPath: string = CONFIGURL.api.tatto.POST.register;
  postLoginPath: string = CONFIGURL.api.tatto.POST.auth;
  postValidEmail: string = CONFIGURL.api.tatto.GET.getValidEmail;
  postForgotPassword: string = CONFIGURL.api.tatto.POST.forgotPassword;

  constructor(
    public apiRest: ApiRestClientProvider,
    public storage: StorageDB
  ) {}

  async register(register) {
    const url = this.apiUrl + this.postRegisterPath;
    const header = { headers: { "content-type": "application/json" } };
    try {
      return await this.apiRest.requestHttp("POST", url, register, header);
    } catch (e) {
      throw e;
    }
  }

  async forgotPassword(data, sub) {
    const url = this.apiUrl + this.postForgotPassword + sub
    const header = { headers: { "content-type": "application/json" } };
    try {
      return await this.apiRest.requestHttp("POST", url, data, header)
    } catch (e) {
      throw e
    }
  }

  async login(login) {
    const url = this.apiUrl + this.postLoginPath;
    const headers =  { "content-type": "application/json" };
    try {
      return await this.apiRest.requestHttp("POST", url, login, headers);
    } catch (e) {
      throw e;
    }
  }

  async validEmail(params) {
    console.log(params);
    const url = this.apiUrl + this.postValidEmail;
    const header = { headers: { "content-type": "application/json" } };
    //const headers = { 'Authorization': token, 'content-type': 'application/json' }
    try {
      return await this.apiRest.requestHttp("POST", url, params, header);
    } catch (e) {
      throw e;
    }
  }
}
