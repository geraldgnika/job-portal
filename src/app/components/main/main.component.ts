import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Job } from 'src/app/shared/models/job';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  appliedJobsList: Job[] = [];
  favoriteJobsList: Job[] = [];

  constructor(public authService: AuthService, private toastr: ToastrService, private crudService: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.getAllAppliedJobs();
    this.getAllFavoriteJobs();
  }

  getAllAppliedJobs() {
    this.crudService.fetch_applied().subscribe({
      next: (result: any) => {
        this.appliedJobsList = result.map((e: any) => {
          return e.payload.doc.data();
        })
      },
      error: (err: any) => {
        alert("Error while getting the applied job list!");
      }
    })
  }

  getAllFavoriteJobs() {
    this.crudService.fetch_favorite().subscribe({
      next: (result: any) => {
        this.favoriteJobsList = result.map((e: any) => {
          return e.payload.doc.data();
        })
      },
      error: (err: any) => {
        alert("Error while getting the favorites job list!");
      }
    })
  }

  toastSuccess(msg: string) {
    this.toastr.success(msg, 'Success.');
  }

  toastError(msg: string) {
    this.toastr.error(msg, 'Error!');
  }

  detail_job(job_id?: any): void {
    this.router.navigate(['job/detail/', job_id]);
  }

  apply_job(job_id: string) {
    this.crudService.apply_job(job_id);
    this.toastSuccess('Applied for the position!');
  }
}
