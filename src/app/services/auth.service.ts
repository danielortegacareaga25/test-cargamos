import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/IUser.interface';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  constructor(public afAuth: AngularFireAuth, private router: Router, public afs: AngularFirestore, private db: AngularFireDatabase) {
    // this.updateOnDisconnect().subscribe();
  }

  // getPresence(uid: string) {
  //   return this.db.object(`status/${uid}`).valueChanges();
  // }

  getUser(): Promise<IUser> {
    return this.afAuth.authState.pipe(first(), map(user => ({ uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL, }))).toPromise();
  }

  // get User() {
  //   return this.user;
  // }


  // private async setPresence(status: string) {
  //   const user = await this.getUser();
  //   if (user) {
  //     return this.db.object(`status/${user.uid}`).update({ status, timestamp: this.timestamp });
  //   }
  // }

  // private get timestamp() {
  //   return firebase.database.ServerValue.TIMESTAMP;
  // }

  // updateOnDisconnect() {
  //   return this.afAuth.authState.pipe(
  //     tap(user => {
  //       console.log('user disconnect', user);
  //       if (user) {

  //         this.db.object(`status/${user.uid}`).query.ref.onDisconnect()
  //           .update({
  //             status: 'offline',
  //             timestamp: this.timestamp
  //           });
  //       }
  //     })
  //   );
  // }


  // updateOnUser() {
  //   const connection = this.db.object('.info/connected').valueChanges().pipe(
  //     map(connected => {
  //       return connected ? 'online' : 'offline';
  //     })
  //   );

  //   return this.afAuth.authState.pipe(
  //     switchMap(user => user ? connection : of('offline')),
  //     tap(status => { console.log('status', status); return status; })
  //   );
  // }


  public SignUp(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['/']);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  public async GoogleAuth(): Promise<void> {
    try {
      const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }

  public async SignIn(email: string, password: string): Promise<void> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
      window.alert(error.message);
    }
  }


  public async SignOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['auth']);
    });

  }



}
