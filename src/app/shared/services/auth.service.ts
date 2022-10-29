import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userObject: any; // Saves currently authenticated user object
  authedUser: any; // Saves 'role' and 'uid'

  constructor(public database: AngularFirestore, public authentication: AngularFireAuth, public router: Router) {
    // Saves user's data in Local Storage if authenticated
    this.authentication.authState.subscribe(user => {
      if (user) {
        this.userObject = user;
        localStorage.setItem('user', JSON.stringify(user));

        // Fetch 'role' and 'uid' from Collection 'users', for the currently authenticated user
        this.database.collection('users', ref => ref.where("uid", "==", this.userObject.uid)).valueChanges().subscribe(users => {
          for (let user of users) {
            this.authedUser = user;
          }
        })
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  async sign_in(email: string, password: string) {
    try {
      const data = await this.authentication.signInWithEmailAndPassword(email, password);
      this.fill_user_object(data.user);
      this.authentication.authState.subscribe(user => {
        if (user) {
          this.router.navigate(['main']);
        }
      });
    } catch (error) {
      alert("We could not sign you in for the moment!");
    }
  }

  async sign_up(email: string, password: string, fname?: string, lname?: string, role?: string) {
    let checkbox_element = <HTMLInputElement>document.getElementById("role");
    let checkbox_value = checkbox_element.checked;

    if (checkbox_value) {
      role = "recruiter";
    } else {
      role = "seeker";
    }

    try {
      const data = await this.authentication.createUserWithEmailAndPassword(email, password);
      this.fill_user_object(data.user);
      if (data.user) {
        data.user.updateProfile({
          displayName: `${fname} ${lname}`,
        });
        this.database.collection('users').doc(data.user.uid).set({
          uid: `${data.user.uid}`,
          role: `${role}`
        });
      }
      this.router.navigate(['main']);
    } catch (error) {
      console.log("We could not sign you up for the moment!");
    }
  }

  // Get boolean value if user is signed in or no
  get is_signed_in(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  // Fills 'userObject' of Model 'User' with data from 'authState' when user signs in our signs up
  fill_user_object(user: any) {
    const userObject: User = {
      uid: user.uid,
      email: user.email,
    };
  }

  async sign_out() {
    await this.authentication.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/auth/sign-in']);
  }
}
