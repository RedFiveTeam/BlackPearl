import { AcronymRepository } from './AcronymRepository';
import { AcronymModel } from '../AcronymModel';

export class StubAcronymRepository implements AcronymRepository {
  findAll(): Promise<AcronymModel[]> {
    return Promise.resolve([
      new AcronymModel(1, 'AAA', 'Aaron Allon Arnold'),
      new AcronymModel(2, 'BBB', 'Baron Bllon Brnold'),
      new AcronymModel(3, 'CCC', 'Crazy Cronin Creep'),
      new AcronymModel(4, 'DDD', 'Dank Dylan Does'),
    ]);
  }

  saveAcronym(acronym: AcronymModel): Promise<AcronymModel> {
    acronym.setAcronym('NTA');
    acronym.setDefinition('New Test Acronym');
    return Promise.resolve(acronym);
  }

  deleteAcronym(acronym: AcronymModel): Promise<void> {
    return Promise.resolve();
  }
}