import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-update',
  templateUrl: './job-update.component.html',
  styleUrls: ['./job-update.component.css']
})
export class JobUpdateComponent implements OnInit {
  update_form: FormGroup;
  job: any;

  constructor(public fb: FormBuilder, private toastr: ToastrService, private _location: Location, private router: Router, private act: ActivatedRoute, private route: ActivatedRoute, private crudService: CrudService) {
    this.route.params.subscribe(params => {
      this.crudService.getDetailsById(params['job_id']).subscribe(i => {
        this.job = i;
      })
    });

    this.update_form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      salary: ['', Validators.required],
      job_profile: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  toastSuccess(msg: string) {
    this.toastr.success(msg, 'Success.');
  }

  toastError(msg: string) {
    this.toastr.error(msg, 'Error!');
  }

  update_job() {
    this.update_form = this.fb.group({
      title: [this.job.title],
      description: [this.job.description],
      salary: [this.job.salary],
      job_profile: [this.job.job_profile],
      poster: [this.job.poster],
      poster_id: [this.job.poster_id],
      created_at: [this.job.created_at]
    })

    const id = this.act.snapshot.paramMap.get('job_id');
    this.crudService.update_job(this.update_form.value, id);
    this.router.navigate(['job/detail/', id]);
    this.toastSuccess('Job updated!');
  }

  goBack() {
    this._location.back();
  }
}
