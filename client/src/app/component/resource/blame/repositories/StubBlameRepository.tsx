import { BlameModel } from '../BlameModel';
import { BlameRepository } from './BlameRepository';

export class StubBlameRepository implements BlameRepository {

  findAll(): Promise<BlameModel[]> {
    return Promise.resolve([
      new BlameModel(1, 'ADD', 'Google', 'TOM', 1542726000),
      new BlameModel(1, 'EDIT', 'Google', 'TOM', 1542727000),
      new BlameModel(1, 'DELETE', 'Google', 'TOM', 1542728000)
    ]);
  }
}