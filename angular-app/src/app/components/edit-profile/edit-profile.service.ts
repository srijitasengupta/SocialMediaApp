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
export class EditProfileService {

    app = initializeApp(environment.firebase);
    db = getFirestore(this.app);
    showLoader = false;
    collectionRef: CollectionReference<DocumentData> = collection(this.db, "users");

    //users : User[] = [];
    constructor(private fireauth: AngularFireAuth, private router: Router) { }

    async getUserByID(id: string){
        const docRef = doc(this.collectionRef, id);
        const docSnap = await getDoc(docRef);
        return docSnap;

    }

    async saveUser(user :any){
      this.showLoader = true;
        try{
            const docRef = doc(this.collectionRef, user.id);
            await setDoc(docRef, user.Data);
            this.showLoader = false;
            alert("Changes saved");
        }
        catch(err){
            alert(err);
        }

    }

}
