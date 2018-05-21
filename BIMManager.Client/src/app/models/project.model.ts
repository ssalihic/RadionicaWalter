import { IBimmodelModel } from './bimmodel.model';

export interface IProject {
  name: string;
  version: number;
  status: string;
  bimmodels: Array<IBimmodelModel>;
}
