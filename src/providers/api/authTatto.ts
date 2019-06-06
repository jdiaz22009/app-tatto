import { Injectable } from '@angular/core';

import { CONFIGURL } from '../configUrl';

import { RegisterTatto } from '@models/auth';

import { ApiRestClientProvider } from './apiRest';
import { StorageDB } from '@providers/storageDB';

@Injectable()
export class authTattoProvider{

  apiUrl:string = CONFIGURL.api.url

  postRegisterPath:string = CONFIGURL.api.tatto.POST.register

  constructor(
    public apiRest:ApiRestClientProvider,
    public storage:StorageDB
  ){
  }

  register(register:RegisterTatto){
    const url = this.apiUrl + this.postRegisterPath
    const header = { 'content-type': 'application/json' }
    console.log(register)

  }
}