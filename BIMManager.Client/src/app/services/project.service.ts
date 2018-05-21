import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { IProject } from '../models/project.model';
import { IServerResponse } from '../models/server-response.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectService {

  constructor(private apiService: ApiService) {}

  getAll(limit?: number, skip?: number, search?: string): Observable<{}> {

    return this.apiService.get('project', {
      limit,
      skip,
      search
    });
  }

  create(project: IProject): Observable<{}> {

    return this.apiService.post('project', JSON.stringify(project));
  }
}
