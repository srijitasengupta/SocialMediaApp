import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, CollectionReference, query, where, getDocs, getDoc, DocumentData } from "firebase/firestore";
import { Post } from 'src/app/model/post.model';
import { User } from 'src/app/model/user.model';
import { UtilsService } from 'src/app/services/utils.service';
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
    constructor(
        private fireauth: AngularFireAuth, 
        private router: Router,
        public utilsService: UtilsService
        ) { }

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
            this.utilsService.handleSuccess('Changes Saved.');
        }
        catch(err){
           this.utilsService.handleError(err);
        }

    }

    async getPosts(queryParams: any[]): Promise<Post[]> {
		let posts: Post[] = [];
		const usersRef = collection(this.db, "posts");
		const q = query(usersRef, where("User", "in",queryParams));
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((doc) => {
			let post = new Post();
			post.ID = doc.id;
			post.Data = doc.data();
			posts.push(post);
		});
		return posts;
	}

}
