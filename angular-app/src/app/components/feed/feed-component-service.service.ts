import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FeedComponentServiceService {

  constructor(private firestore : AngularFirestore) { }

  getAllUsers() {
    return this.firestore.collection('/users').snapshotChanges();
  }
}
