import { AcronymModel } from '../AcronymModel';

export interface AcronymRepository {
  findAll(): Promise<AcronymModel[]>;
}