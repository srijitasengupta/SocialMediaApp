import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, CollectionReference } from "firebase/firestore";
import type { DocumentData } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  app= initializeApp(environment.firebaseConfig);
  db=getFirestore(this.app);

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');
        this.router.navigate(['/my-feed']);

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  // register method
   register(email : string, password : string) {
  this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {

      let userid = res.user?.uid.toString();

      let data ={
        Bio: 'Love this journey for me',
        Followers: 0
      };
      
      const collectionRef : CollectionReference<DocumentData> = collection(this.db, "users")
      const docRef = doc(collectionRef,userid);
      setDoc(docRef,data);

      alert('Registration Successful');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

}