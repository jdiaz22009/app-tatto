import { Injectable } from '@angular/core';

import { CONFIGURL } from '../configUrl';

import { ApiRestClientProvider } from './apiRest';
import { StorageDB } from '../storageDB';

@Injectable()
export class authTattoProvider{

  apiUrl:string = CONFIGURL.api.url

  postRegisterPath:string = CONFIGURL.api.tatto.POST.register

  constructor(
    public apiRest:ApiRestClientProvider,
    public storage:StorageDB
  ){
  }

  async register(register){
    const url = this.apiUrl + this.postRegisterPath
    const header = { 'content-type': 'application/json' }
    try {
      return await this.apiRest.requestHttp('POST',url,register,header)
    } catch (e) {
      throw e
    }


  }
}