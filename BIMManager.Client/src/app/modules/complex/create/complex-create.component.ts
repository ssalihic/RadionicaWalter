import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ComplexService } from "../../../services/complex.service";

@Component({
    selector: 'app-complex-create',
    templateUrl: './complex-create.component.html',
    styleUrls: ['./complex-create.component.css']
})
export class ComplexCreateComponent implements OnInit {

    form: FormGroup;

    constructor(private fb: FormBuilder,
                private complexService: ComplexService,
                private router: Router) {}

    ngOnInit(): void {
        
        this.form = this.fb.group({
            name: new FormControl('', Validators.compose([
                Validators.required
            ])),
            latitude: new FormControl(0, Validators.min(0)),
            longitude: new FormControl(0)
        });
    }

    createComplex(): void {

        this.complexService
            .create(this.form.value)
            .subscribe(() => {
                alert('Complex successfully created');
                this.router.navigate(['/complex']);
            });
    }
}
