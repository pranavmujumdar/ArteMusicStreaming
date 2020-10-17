import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class LogoutService {

  constructor(public afAuth: AngularFireAuth) { }

  Logout() {
    this.afAuth.auth.signOut();
  }
}
