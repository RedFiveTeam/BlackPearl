import { BlameModel } from '../BlameModel';

export interface BlameRepository {
  findAll(): Promise<BlameModel[]>;
}