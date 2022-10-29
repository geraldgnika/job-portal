import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: any;

  constructor(public authService: AuthService, private _location: Location, private route: ActivatedRoute, private crudService: CrudService, private router: Router) {
    this.route.params.subscribe(params => {
      this.crudService.getDetailsById(params['job_id']).subscribe(i => {
        this.job = i;
      })
    });
  }

  ngOnInit(): void {
  }

  goBack() {
    this._location.back();
  }
}
