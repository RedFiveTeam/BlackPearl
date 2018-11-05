import { InformationModel } from '../InformationModel';

export interface InformationRepository {
  findAll(): Promise<InformationModel[]>;
  update(information: InformationModel[]): Promise<InformationModel[]>;
}