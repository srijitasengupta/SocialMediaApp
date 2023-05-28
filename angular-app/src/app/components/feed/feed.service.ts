import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query, where, doc, getDoc } from 'firebase/firestore';
import { Post } from 'src/app/model/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  constructor(private router: Router) { }

  async getPosts(queryParams: any[]): Promise<Post[]> {
    const posts: Post[] = [];
    const usersRef = collection(this.db, "posts");
    const q = query(usersRef, where("User", "in", queryParams));
    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (doc) => {
      const post = new Post();
      post.ID = doc.id;
      post.Data = doc.data();
      try {
        const res = await this.getUserByID(post.Data.User);
        post.User = res.data();
        posts.push(post);
      } catch (err) {
        this.router.navigate(['error-page']);
      }
    });

    await Promise.all(promises);
    return posts;
  }

  async getUserByID(id: string) {
    const docRef = doc(collection(this.db, "users"), id);
    const docSnap = await getDoc(docRef);
    return docSnap;
  }
}

