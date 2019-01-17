import { AcronymModel } from '../AcronymModel';

export interface AcronymRepository {
  findAll(): Promise<AcronymModel[]>;
  saveAcronym(acronym: AcronymModel): Promise<AcronymModel>;
  deleteAcronym(acronym: AcronymModel): Promise<void>;
  updateAcronym(acronym: AcronymModel): Promise<AcronymModel>;
}