import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from 'app/services/can-deactivate-guard.service';

import { CommentPeriodsComponent } from './comment-periods/comment-periods.component';
import { CommentPeriodsResolver } from './comment-periods/comment-periods-resolver.services';
import { ComplianceComponent } from './compliance/compliance.component';
import { MilestonesComponent } from './milestones/milestones.component';
import { ProjectAddEditComponent } from './project-add-edit/project-add-edit.component';
import { ProjectComponent } from './project.component';
import { ProjectContactsComponent } from './project-contacts/project-contacts.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectUpdatesComponent } from './project-updates/project-updates.component';
import { ReviewCommentsComponent } from './review-comments/review-comments.component';
import { ValuedComponentsComponent } from './valued-components/valued-components.component';

import { ProjectResolver } from './project-resolver.service';

const routes: Routes = [
  {
    path: 'p/:projId',
    component: ProjectComponent,
    resolve: {
      project: ProjectResolver
    },
    children: [
      {
        path: '',
        redirectTo: 'project-details',
        pathMatch: 'full'
      },
      {
        path: 'project-details',
        component: ProjectDetailComponent,
      },
      {
        path: 'compliance',
        component: ComplianceComponent,
      },
      {
        path: 'valued-components',
        component: ValuedComponentsComponent,
      },
      {
        path: 'project-updates',
        component: ProjectUpdatesComponent,
      },
      {
        path: 'project-contracts',
        component: ProjectContactsComponent,
      },
      {
        path: 'comment-periods',
        component: CommentPeriodsComponent,
        resolve: {
          commentPeriods: CommentPeriodsResolver
        }
      },
      {
        path: 'milestones',
        component: MilestonesComponent,
      },
      {
        path: 'edit',
        component: ProjectAddEditComponent,
        resolve: {
          project: ProjectResolver
        },
        canDeactivate: [CanDeactivateGuard]
      },
    ]
  },
  {
    path: 'comments/:projId',
    component: ReviewCommentsComponent,
    resolve: {
      project: ProjectResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ProjectResolver,
    CommentPeriodsResolver
  ]
})

export class ProjectRoutingModule { }