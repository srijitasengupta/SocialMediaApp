import { Injectable } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { Post } from 'src/app/model/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class FeedService {

	app = initializeApp(environment.firebase);
	db = getFirestore(this.app);

	constructor() { }

	// getAllUsers() {
	// 	return this.firestore.collection('/users').snapshotChanges();
	// }

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
