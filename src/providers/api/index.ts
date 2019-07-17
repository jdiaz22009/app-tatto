import { ApiRestClientProvider } from './apiRest';
import { authTattoProvider } from './authTatto';
import { tattoReqProvider } from './tattoReq';

export const API_MODULE = [
  ApiRestClientProvider,
  authTattoProvider,
  tattoReqProvider,
]