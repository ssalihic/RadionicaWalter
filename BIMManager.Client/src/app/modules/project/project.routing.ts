import { Route } from '@angular/router';

import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { ProjectCreateComponent } from './create/project-create.component';

export const PROJECT_ROUTES: Route[] = [
  { path: '', component: ProjectManagerComponent },
  { path: 'create', component: ProjectCreateComponent },
];
