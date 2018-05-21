import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { IComplex } from "../../../models/complex.model";
import { ComplexService } from "../../../services/complex.service";
import { IServerResponse } from "../../../models/server-response.model";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import { PageChangedEvent } from "ngx-bootstrap/pagination";

@Component({
    selector: 'app-complex-manager',
    templateUrl: './complex-manager.component.html',
    styleUrls: ['./complex-manager.component.css']
})
export class ComplexManagerComponent implements OnInit {

    searchForm: FormGroup;
    complexes: Array<IComplex> = [];
    totalItems: number;

    constructor(private fb: FormBuilder,
                private complexService: ComplexService) {}

    ngOnInit(): void {

        this.searchForm = this.fb.group({
            search: new FormControl('')
        });

        this.searchForm
            .get('search')
            .valueChanges
            .debounceTime(300)
            .switchMap((value: string) => this.complexService
                .getAll(null, null, value))
            .subscribe((response: IServerResponse<Array<IComplex>>) => {
                this.complexes = response.result;
            });

        this.getAllComplexes();
    }

    onPageChanged(event: PageChangedEvent): void {

        this.complexService
            .getAll(event.itemsPerPage, (event.page - 1) * event.itemsPerPage)
            .subscribe((response: IServerResponse<Array<IComplex>>) => {
                this.complexes = response.result;
            });
    }

    private getAllComplexes(): void {

        this.complexService
            .getAll()
            .subscribe((response: IServerResponse<Array<IComplex>>) => {
                this.complexes = response.result;
                this.totalItems = response.meta.total;
            });
    }
}
