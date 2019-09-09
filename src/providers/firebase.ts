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
    const imgRef = this.storage.ref(`tattoo/gallery/${id}/${name}`)
    return new Promise((resolve, reject) => {
      const task = imgRef.putString(data, 'base64', { contentType: 'image/jpg' })
      task.on(
        'state_changed',
        snapshot => {
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
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

  getProfilePicture(mode, userId) {

    let reference = `tattoo`
    switch (mode) {
      case 0:
        reference += `/gallery/${userId}`
        break;
    }

    const imgRef = this.database.ref(reference)
    return new Promise((resolve, reject) => {
      imgRef.once('value', (snap) => {
        console.log(snap.val(), 'snap de Picture')
        resolve(snap.val())
      }, (e) => {
        reject(e)
      })
    })
  }
}
