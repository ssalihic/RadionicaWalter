import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ProjectService } from "../../../services/project.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-project-create',
    templateUrl: './project-create.component.html',
    styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

    form: FormGroup;

    constructor(private fb: FormBuilder,
                private projectService: ProjectService,
                private router: Router) {}

    ngOnInit(): void {
        
        this.form = this.fb.group({
            name: new FormControl('', Validators.compose([
                Validators.required
            ])),
            version: new FormControl('', Validators.min(0)),
            status: new FormControl('In progress')
        });
    }

    createProject(): void {

        this.projectService.create(this.form.value)
            .subscribe(() => {
                alert('Project successfully created');
                this.router.navigate(['/project']);
            });
    }
}
