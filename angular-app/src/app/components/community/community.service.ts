import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, CollectionReference, query, where, getDocs, getDoc, DocumentData } from "firebase/firestore";
import { User } from 'src/app/model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  users: User[] = [];
  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  async getAllUsers(): Promise<User[]> {
    this.users =[];
    const querySnapshot = await getDocs(collection(this.db, "users"));
    querySnapshot.forEach((doc) => {

      if(doc.id != localStorage.getItem('activeUser')) {
      let user = new User();
      user.id = doc.id;
      user.Data = doc.data();
      this.users.push(user);
      }
    });
    return this.users;
  }

  async getUserByName(searchTerm: string): Promise<User[]> {
    this.users =[];
    const usersRef = collection(this.db, "users");
    const q = query(usersRef, where("Name", "==", searchTerm));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        let user = new User();
        user.id = doc.id;
        user.Data = doc.data();
        this.users.push(user);
    });
    return this.users;
  }

}
