import { InformationRepository } from './InformationRepository';
import { InformationModel } from '../InformationModel';

export class StubInformationRepository implements InformationRepository {
  findAll(): Promise<InformationModel[]> {
    return Promise.resolve([
      new InformationModel(1, 'Phone Number', '123-456-7890'),
      new InformationModel(2, 'Server', 'www.com')
    ]);
  }

  update(information: InformationModel[]): Promise<InformationModel[]> {
    return Promise.resolve(information);
  }
}