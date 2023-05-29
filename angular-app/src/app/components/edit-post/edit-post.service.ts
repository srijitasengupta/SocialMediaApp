import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { CollectionReference, collection, doc, getDoc, getFirestore, setDoc, DocumentData, deleteDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class EditPostService {
	app = initializeApp(environment.firebase);
	db = getFirestore(this.app);
  	showLoader = false;
	collectionRef: CollectionReference<DocumentData> = collection(this.db, "posts");

	//users : User[] = [];
	constructor(
		private fireauth: AngularFireAuth, 
		private router: Router,
		
		) { }

	async getPostByID(id: string) {
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);
		return docSnap;

	}

	async savePost(post: any) {
    this.showLoader = true;
		post.Data = {
			ObjectCreatedDate: post.ObjectCreatedDate,
			ObjectLastModifiedDate: post.ObjectLastModifiedDate,
			Caption: post.Caption,
			PhotoUrl: post.PhotoUrl,
			User: post.User,
			Likes: post.Likes,
			Comments: post.Comments,
		}
		try {
			let docRef: any;

			if (post.ID != undefined)
				docRef = doc(this.collectionRef, post.ID);
			else
				docRef = doc(this.collectionRef);

			await setDoc(docRef, post.Data);
      		this.showLoader = false;
			
			alert("Changes saved");
		}
		catch (err) {
			alert(err);
		}

	}

	async deletePost(post: any){
    this.showLoader = true;
		console.log(post)
		try {

			let docRef = doc(this.collectionRef, post.ID);
			await deleteDoc(docRef);
      this.showLoader = false;
			alert("Post deleted");

		}
		catch (err) {
			alert(err);
		}
	}
}
