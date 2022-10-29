import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Job } from 'src/app/shared/models/job';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobTitleFilter: string = "";
  jobListWithoutFilter: any = [];
  jobsList: Job[] = [];

  constructor(public authService: AuthService, private toastr: ToastrService, private crudService: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.jobs_list();
  }

  toastSuccess(msg: string) {
    this.toastr.success(msg, 'Success.');
  }

  toastError(msg: string) {
    this.toastr.error(msg, 'Error!');
  }

  jobs_list() {
    this.crudService.jobs_list().subscribe({
      next: (result: any) => {
        this.jobsList = this.jobListWithoutFilter = result.map((e: any) => {
          return e.payload.doc.data();
        })
      },
      error: (err: any) => {
        alert("Error while getting the job list!");
      }
    })
  }

  detail_job(job_id?: any): void {
    this.router.navigate(['job/detail/', job_id]);
  }

  filterTitles() {
    let jobTitleFilter = this.jobTitleFilter;

    this.jobsList = this.jobListWithoutFilter.filter(function (
      el: any
    ) {
      return (el.title.toString().toLowerCase().includes(jobTitleFilter.toString().trim().toLowerCase()) || el.job_profile.toString().toLowerCase().includes(jobTitleFilter.toString().trim().toLowerCase()));
    });
  }

  update_job(job_id?: any): void {
    this.router.navigate(['job/update/', job_id]);
  }

  delete_job(job_id: string) {
    this.crudService.delete_job(job_id);
    this.toastSuccess('Job deleted!');
  }
}
