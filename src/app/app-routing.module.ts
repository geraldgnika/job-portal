import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobCreateComponent } from './components/job/job-create/job-create.component';
import { JobDetailComponent } from './components/job/job-detail/job-detail.component';
import { JobListComponent } from './components/job/job-list/job-list.component';
import { JobOffersComponent } from './components/job/job-offers/job-offers.component';
import { JobUpdateComponent } from './components/job/job-update/job-update.component';
import { MainComponent } from './components/main/main.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { IsSignedInGuard } from './shared/guards/is-signed-in.guard';
import { IsRecruiterGuard } from './shared/guards/is-recruiter.guard';
import { IsSeekerGuard } from './shared/guards/is-seeker.guard';

const routes: Routes = [
  {
    // Guard(s) Note: redirect to Sign In if not authenticated
    path: '',
    component: MainComponent,
    title: 'JP | Profile',
    canActivate: [AuthGuard]
  },
  {
    // Guard(s) Note: redirect to Sign In if not authenticated
    path: 'main',
    component: MainComponent,
    title: 'JP | Profile',
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    children: [
      {
        // Guard(s) Note: redirect to Main if authenticated
        path: 'sign-in',
        component: SignInComponent,
        title: 'JP | Sign In',
        canActivate: [IsSignedInGuard]
      },
      {
        // Guard(s) Note: redirect to Main if authenticated
        path: 'sign-up',
        component: SignUpComponent,
        title: 'JP | Sign Up',
        canActivate: [IsSignedInGuard]
      }
    ]
  },
  {
    path: 'job',
    children: [
      {
        // Guard(s) Note: redirect to Sign In if not authenticated and if it is not a Recruiter redirect to Main
        path: 'create',
        component: JobCreateComponent,
        title: 'JP | Create Job',
        canActivate: [AuthGuard, IsSeekerGuard]
      },
      {
        // Guard(s) Note: redirect to Sign In if not authenticated and if it is not a Recruiter redirect to Main
        path: 'update/:job_id',
        component: JobUpdateComponent,
        title: 'JP | Update Job',
        canActivate: [AuthGuard, IsSeekerGuard]
      },
      {
        // Guard(s) Note: redirect to Sign In if not authenticated and if it is not Recruiter redirect to Main
        path: 'list',
        component: JobListComponent,
        title: 'JP | Jobs List',
        canActivate: [AuthGuard, IsSeekerGuard]
      },
      {
        // Guard(s) Note: redirect to Sign In if not authenticated and if it is not Seeker redirect to Main
        path: 'offers',
        component: JobOffersComponent,
        title: 'JP | Job Offers',
        canActivate: [AuthGuard, IsRecruiterGuard]
      },
      {
        // Guard(s) Note: redirect to Sign In if not authenticated
        path: 'detail/:job_id',
        component: JobDetailComponent,
        title: 'JP | Job Details',
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
