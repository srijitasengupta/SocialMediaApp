import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, CollectionReference, query, where, getDocs, getDoc } from "firebase/firestore";
import type { DocumentData } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  imgUrl: any;

  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/my-feed']);

    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  // register method
  async register(email: string, password: string, file: any) {
    try {
      const res = await this.fireauth.createUserWithEmailAndPassword(email, password);

      const userid = res.user?.uid.toString();
      const downloadUrl = await this.uploadImage(file, userid);

      const data = {
        Bio: 'Love this journey for me',
        Followers: 0,
        photoUrl: downloadUrl
      };

      const collectionRef: CollectionReference<DocumentData> = collection(this.db, "users")
      const docRef = doc(collectionRef, userid);
      await setDoc(docRef, data);

      alert('Registration Successful');
      this.router.navigate(['/login']);
    } catch (err) {
      alert(err);
      this.router.navigate(['/register']);
    }
  }

  // sign out
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  async getAllUsers() {
    const querySnapshot = await getDocs(collection(this.db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }

  async uploadImage(file: any, userId: any): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + userId + '.jpg');

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          alert(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  }


}


