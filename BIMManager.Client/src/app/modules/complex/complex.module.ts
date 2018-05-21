import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComplexManagerComponent } from "./complex-manager/complex-manager.component";
import { COMPLEX_ROUTES } from "./complex.routing";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { ComplexCreateComponent } from "./create/complex-create.component";

@NgModule({
    declarations: [
        ComplexManagerComponent,
        ComplexCreateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(COMPLEX_ROUTES),
        PaginationModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
    ],
    exports: []
})
export class ComplexModule {}