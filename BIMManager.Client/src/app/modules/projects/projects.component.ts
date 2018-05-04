import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {



  constructor(private http: HttpClient) { }

  register(): void {

    this.http.post<any>('http://localhost:5000/api/auth/projects', {

    })
      .subscribe((response: any) => console.log(response),
      (err: any) => console.error(err));
  }
}
