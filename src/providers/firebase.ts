import { Injectable } from '@angular/core'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

@Injectable()
export class FirebaseProvider {

  database: any
  storage: any
  imgRef: any

  constructor() {

    this.database = firebase.database()
    this.storage = firebase.storage()

  }


  uploadPicture(data, id, name) {

    const imgRef = this.storage.ref(`tattoo/${id}/${name}`)
    return new Promise((resolve, reject) => {
      const task = imgRef.putString(data, 'base64', { contentType: 'image/jpg' })
      task.on(
        'state_changed',
        snapshot => {
          const percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100
          console.log(percentage)
        },
        error => {
          reject(error)
        },
        () => {
          imgRef.getDownloadURL().then(resUrl => {
            resolve(resUrl)
          })
        }
      )
    })

  }


}
