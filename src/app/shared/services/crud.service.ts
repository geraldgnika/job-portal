import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(public authService: AuthService, private database: AngularFirestore) { }

  create_job(job: Job) {
    job.id = this.database.createId();
    return this.database.collection('jobs').doc(job.id).set(job);
  }

  jobs_list() {
    return this.database.collection('jobs', ref => ref.where("poster_id", "==", this.authService.userObject.uid)).snapshotChanges();
  }

  job_offers() {
    return this.database.collection('jobs').snapshotChanges();
  }

  delete_job(job_id: string) {
    return this.database.doc('/jobs/' + job_id).delete();
  }

  apply_job(job_id: string) {
    this.database
      .collection('jobs')
      .doc(job_id)
      .set(
        { applied: [{ userid: this.authService.userObject.uid }] },
        { merge: true }
      );
  }

  favorite_job(job_id: string) {
    this.database
      .collection('jobs')
      .doc(job_id)
      .set(
        { favorites: [{ userid: this.authService.userObject.uid }] },
        { merge: true }
      );
  }

  fetch_applied() {
    return this.database.collection('jobs', ref => ref.where("applied", 'array-contains', { userid: this.authService.userObject.uid })).snapshotChanges();
  }

  fetch_favorite() {
    return this.database.collection('jobs', ref => ref.where("favorites", 'array-contains', { userid: this.authService.userObject.uid })).snapshotChanges();
  }

  update_job(job: Job, id: any) {
    this.database.collection('jobs').doc(id).update({
      title: job.title,
      description: job.description,
      salary: job.salary,
      job_profile: job.job_profile,
      poster: job.poster,
      poster_id: job.poster_id,
      created_at: job.created_at
    });
  }

  getDetailsById(job_id: any) {
    return this.database.collection('jobs').doc(job_id).valueChanges();
  }
}
