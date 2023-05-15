import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, CollectionReference, query, where, getDocs, getDoc } from "firebase/firestore";
import type { DocumentData } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { User } from '../model/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    app = initializeApp(environment.firebase);
    db = getFirestore(this.app);

    constructor(private fireauth: AngularFireAuth, private router: Router) { }

    // login method
    async login(email: string, password: string) {
        try {
            const res = await this.fireauth.signInWithEmailAndPassword(email, password);

            let userid = res.user?.uid.toString();
            const collectionRef: CollectionReference<DocumentData> = collection(this.db, "users")
            const docRef = doc(collectionRef, userid);

            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log(docSnap.data());
                localStorage.setItem('activeUser',docSnap.id);
                let user = new User();
                user.Data =docSnap.data();
            }
            alert('Login Successful!');
            this.router.navigate(['/community']);
        } catch (err) {
            alert(err);
            this.router.navigate(['/register']);
        }
    }

    // register method
    async register(email: string, password: string, file: any, dob: any, name: string) {
        try {
            const res = await this.fireauth.createUserWithEmailAndPassword(email, password);

            const userid = res.user?.uid.toString();
            const downloadUrl = await this.uploadImage(file, userid);

            const data = {
                Bio: 'Love this journey for me',
                Followers: 0,
                photoUrl: downloadUrl,
                Name: name,
                Dob: dob,
                Following: []
            };

            const collectionRef: CollectionReference<DocumentData> = collection(this.db, "users")
            const docRef = doc(collectionRef, userid);
            await setDoc(docRef, data);

            alert('Registration Successful');
            this.router.navigate(['/community']);
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


