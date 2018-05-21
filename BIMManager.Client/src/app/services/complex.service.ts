import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';

import { ApiService } from "./api.service";
import { IComplex } from "../models/complex.model";

@Injectable()
export class ComplexService {

    constructor(private apiService: ApiService) {}

    getAll(limit?: number, skip?: number, search?: string): Observable<{}> {

        return this.apiService.get('complex', {
          limit,
          skip,
          search
        });
      }

    create(complex: IComplex): Observable<{}> {

        return this.apiService.post('complex', JSON.stringify(complex));
    }
}