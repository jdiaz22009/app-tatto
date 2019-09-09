import { StorageDB } from "./storageDB";
import { AlertProvider } from "./alert";
import { Authjwt } from "./authjwt";
import { NetworkProvider } from "./network";
import { MediaProvider } from "./media";
import { FirebaseProvider } from "./firebase";

export const PROVIDERS_MODULE = [
  StorageDB,
  AlertProvider,
  Authjwt,
  NetworkProvider,
  MediaProvider,
  FirebaseProvider,
];
