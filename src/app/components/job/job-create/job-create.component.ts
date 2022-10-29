import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Job } from 'src/app/shared/models/job';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit {
  today = new Date();

  id: string = '';
  title: string = '';
  description: string = '';
  salary: any = null;
  job_profile: string = '';
  poster: string = '';
  poster_id: string = '';
  created_at: any = null;

  job_object: Job = {
    id: '',
    title: '',
    description: '',
    salary: null,
    job_profile: '',
    poster: '',
    poster_id: '',
    created_at: null
  }

  constructor(public authService: AuthService, private toastr: ToastrService, private crudService: CrudService, private router: Router) { }

  ngOnInit(): void {
  }

  toastSuccess(msg: string) {
    this.toastr.success(msg, 'Success.');
  }

  toastError(msg: string) {
    this.toastr.error(msg, 'Error!');
  }

  create_job() {
    if (this.title == '' || this.description == '' || this.salary == null || this.job_profile == '') {
      this.toastError('Fill all the input fields!');
      return;
    }

    this.job_object.id = '';
    this.job_object.title = this.title;
    this.job_object.description = this.description;
    this.job_object.salary = this.salary;
    this.job_object.job_profile = this.job_profile;
    this.job_object.poster = this.authService.userObject.displayName;
    this.job_object.poster_id = this.authService.userObject.uid;
    this.job_object.created_at = this.today.toLocaleDateString();

    this.crudService.create_job(this.job_object);
    this.toastSuccess('Job created!');

    this.clear_form();
  }

  clear_form() {
    this.id = '';
    this.title = '';
    this.description = '';
    this.salary = null;
    this.job_profile = '';
    this.poster = '';
    this.poster_id = '';
    this.created_at = null;
  }
}
