import { StorageDB } from "./storageDB";
import { AlertProvider } from "./alert";
import { Authjwt } from "./authjwt";
import { NetworkProvider } from "./network";

export const PROVIDERS_MODULE = [
  StorageDB,
  AlertProvider,
  Authjwt,
  NetworkProvider
];
