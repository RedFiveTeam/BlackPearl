import { AcronymActions } from './AcronymActions';
import { AcronymModel } from './AcronymModel';

describe('AcronymActions', () => {
  let subject: AcronymActions;
  let acronymStore: any;
  let acronymRepository: any;

  beforeEach(() => {
    let acronyms = [
      new AcronymModel(1, 'AAA', 'Aaron Allon Arnold')
    ];

    acronymStore = {
      setAcronyms: jest.fn(),
      acronyms: acronyms
    };

    acronymRepository = {
      findAll: jest.fn()
    };

    subject = new AcronymActions({acronymStore} as any, {acronymRepository} as any);
  });

  it('should set the list of acronyms', async () => {
    await subject.setAllAcronyms();
    expect(acronymStore.setAcronyms).toHaveBeenCalled();
    expect(acronymRepository.findAll).toHaveBeenCalled();
  });
});