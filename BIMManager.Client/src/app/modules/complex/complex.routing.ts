import { Route } from "@angular/router";
import { ComplexManagerComponent } from "./complex-manager/complex-manager.component";
import { ComplexCreateComponent } from "./create/complex-create.component";

export const COMPLEX_ROUTES: Route[] = [
  { path: '', component: ComplexManagerComponent },
  { path: 'create', component: ComplexCreateComponent }
];