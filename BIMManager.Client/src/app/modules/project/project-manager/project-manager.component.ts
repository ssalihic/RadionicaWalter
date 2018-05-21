import { Component, OnInit } from '@angular/core';
import { IProject } from '../../../models/project.model';
import { ProjectService } from '../../../services/project.service';
import { IServerResponse } from '../../../models/server-response.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {

  projects: Array<IProject> = [];
  totalItems: number;
  searchForm: FormGroup;

  constructor(private projectService: ProjectService,
              private router: Router,
              private fb: FormBuilder) {}

  ngOnInit(): void {

    this.searchForm = this.fb.group({
      search: new FormControl('')
    });
    this.getAllProjects();
    this.searchForm
      .valueChanges
      .debounceTime(300)
      .subscribe(() => this.onProjectSearch());
  }
  
  onCreateProject(): void {
    this.router.navigate(['/project', 'create']);
  }

  onProjectSearch(): void {

    if (this.searchForm.value.search.trim() === '') {
      this.getAllProjects();
      return;
    }
    this.projectService.getAll(null, null, this.searchForm.value.search)
      .subscribe((response: IServerResponse<Array<IProject>>) => this.projects = response.result);
  }

  onPageChanged(event: PageChangedEvent): void {
    
    this.projectService.getAll(event.itemsPerPage, (event.page - 1) * event.itemsPerPage)
      .subscribe((response: IServerResponse<Array<IProject>>) => this.projects = response.result);
  }

  private getAllProjects(): void {
    this.projectService.getAll()
      .subscribe((response: IServerResponse<Array<IProject>>) => {
        this.projects = response.result;
        this.totalItems = response.meta.total;
      });
  }
}
