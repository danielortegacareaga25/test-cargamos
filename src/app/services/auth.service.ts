import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/IUser.interface';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  constructor(public afAuth: AngularFireAuth, private router: Router, public afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  public GetUser(): Promise<IUser> {
    return this.afAuth.authState.pipe(first(), map(user => ({ uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL, }))).toPromise();
  }


  public SignUp(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  public async GoogleAuth(): Promise<void> {
    try {
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
        this.router.navigate(['/']);
      });
    } catch (error) {
      Swal.fire(
        error.message,
        'warning');
    }
  }

  public async SignIn(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password).then(() => {
        this.router.navigate(['/']);
      });
    } catch (error) {
      Swal.fire(
        error.message,
        'warning');
    }
  }


  public async SignOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['auth']);
    });
  }
}
