import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { CollectionReference, collection, doc, getDoc, getFirestore, addDoc, setDoc, DocumentData, query, where, getDocs } from 'firebase/firestore';
import { User } from 'src/app/model/user.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ViewPostService {


  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  collectionRef: CollectionReference<DocumentData> = collection(this.db, "posts");
  collectionRefUser: CollectionReference<DocumentData> = collection(this.db, "users");
  collectionRefComment: CollectionReference<DocumentData> = collection(this.db, "comments");

  //users : User[] = [];
  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  async getPostByID(id: string){
      const docRef = doc(this.collectionRef, id);
      const docSnap = await getDoc(docRef);
      return docSnap;

  }

  async getCommentByID(id: string){
    const docRef = doc(this.collectionRefComment, id);
    const docSnap = await getDoc(docRef);
    return docSnap;

}

  async saveComment(comment: any): Promise<string> {
    comment.Data ={
      ObjectCreatedDate: comment.ObjectCreatedDate,
      ObjectLastModifiedDate: comment.ObjectLastModifiedDate,
      CommentStr: comment.CommentStr,
      Post: comment.Post,
      User : comment.User,
    }
    try {
      const docRef =  await addDoc(this.collectionRefComment, comment.Data);
      return docRef.id;
    } catch (error) {
      console.error("Error saving object:", error);
      this.router.navigate(['error-page'])
      throw error;
    }
  }

  async updatePost(postId: any,post: any) : Promise<string>{
    post.Data ={
      ObjectCreatedDate: post.ObjectCreatedDate,
      ObjectLastModifiedDate: post.ObjectLastModifiedDate,
      Caption: post.Caption,
      PhotoUrl: post.PhotoUrl,
      User : post.User,
      Likes : post.Likes,
      Comments: post.Comments,
    }
    try {
      const docRef = doc(this.collectionRef, postId);
      await setDoc(docRef, post.Data);
      alert("Changes saved");
      return docRef.id;
    } catch (err) {
      this.router.navigate(['error-page'])
      throw err;
    }
  }

  async getUserByID(id: string){
    const docRef = doc(this.collectionRefUser, id);
    const docSnap = await getDoc(docRef);
    return docSnap;

}
}
