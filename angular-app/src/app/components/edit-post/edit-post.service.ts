import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { CollectionReference, collection, doc, getDoc, getFirestore, setDoc, DocumentData } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditPostService {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  collectionRef: CollectionReference<DocumentData> = collection(this.db, "posts");
      
  //users : User[] = [];
  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  async getPostByID(id: string){
      const docRef = doc(this.collectionRef, id);
      const docSnap = await getDoc(docRef);
      return docSnap;
      
  }

  async savePost(post :any){
    post.Data ={
      ObjectCreatedDate: post.ObjectCreatedDate,
      ObjectLastModifiedDate: post.ObjectLastModifiedDate,
      Caption: post.Caption,
      PhotoUrl: post.PhotoUrl,
      User : post.User,
      Likes : post.Likes,
      Comments: post.Comments,
    }
      try{
          const docRef = doc(this.collectionRef);
          await setDoc(docRef, post.Data);
          alert("Changes saved");

      }
      catch(err){
          alert(err);
      }
      
  }
}
