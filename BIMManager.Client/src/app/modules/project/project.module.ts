import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { PROJECT_ROUTES } from './project.routing';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { ProjectCreateComponent } from './create/project-create.component';

@NgModule({
  declarations: [
    ProjectManagerComponent,
    ProjectCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule.forRoot(),
    RouterModule.forChild(PROJECT_ROUTES)
  ]
})
export class ProjectModule {}
