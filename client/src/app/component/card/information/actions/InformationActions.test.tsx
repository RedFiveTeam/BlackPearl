import { InformationActions } from './InformationActions';
import { StubInformationRepository } from '../repositories/StubInformationRepository';
import { InformationRepository } from '../repositories/InformationRepository';

describe('InformationActions', () => {
  let subject: InformationActions;
  let informationStore: any;
  let informationRepository: InformationRepository;

  beforeEach(() => {
    informationRepository = new StubInformationRepository();

    informationStore = {
      setImageServer: jest.fn(),
      setCallOutFormat: jest.fn(),
      setImageServerJWICS: jest.fn(),
      setAuabServer: jest.fn(),
      setNavcentServer: jest.fn(),
      setDsnNumber: jest.fn(),
      setSvoipNumber: jest.fn(),
      setTsvoipNumber: jest.fn(),
      setJwicsServer: jest.fn()
    };

    subject = new InformationActions({informationStore} as any, {informationRepository} as any);
  });

  it('should store all information in the store', async () => {
    await subject.setupInformation();
    expect(informationStore.setImageServer).toHaveBeenCalled();
    expect(informationStore.setCallOutFormat).toHaveBeenCalled();
    expect(informationStore.setImageServerJWICS).toHaveBeenCalled();
    expect(informationStore.setAuabServer).toHaveBeenCalled();
    expect(informationStore.setNavcentServer).toHaveBeenCalled();
    expect(informationStore.setDsnNumber).toHaveBeenCalled();
    expect(informationStore.setSvoipNumber).toHaveBeenCalled();
    expect(informationStore.setTsvoipNumber).toHaveBeenCalled();
    expect(informationStore.setJwicsServer).toHaveBeenCalled();
  });

});