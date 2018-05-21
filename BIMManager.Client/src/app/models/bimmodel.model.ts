import { IProject } from './project.model';

export interface IBimmodelModel {
  name: string;
  url: string;
  projectId: number;
  complexId: number;
  entityId: number;
  project: IProject;
}
