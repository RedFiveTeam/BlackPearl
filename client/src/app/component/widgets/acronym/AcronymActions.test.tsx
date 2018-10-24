import { AcronymActions } from './AcronymActions';
import { StubAcronymRepository } from './repositories/StubAcronymRepository';
import { AcronymRepository } from './repositories/AcronymRepository';

describe('AcronymActions', () => {
  let subject: AcronymActions;
  let acronymStore: any;
  let acronymRepository: AcronymRepository;
  let acronyms: string[];

  beforeEach(() => {
    acronyms = [
      'AAA - Aaron Allon Arnold',
      'BBB - Baron Bllon Brnold',
      'CCC - Crazy Cronin Creep',
      'DDD - Dank Dylan Does'
    ];

    acronymStore = {
      setAcronyms: jest.fn(),
      setFilteredAcronyms: jest.fn(),
      acronyms: acronyms
    };

    acronymRepository = new StubAcronymRepository();

    subject = new AcronymActions({acronymStore} as any, {acronymRepository} as any);
  });

  it('should set the list of acronyms', async () => {
    await subject.setAllAcronyms();
    expect(acronymStore.setAcronyms).toHaveBeenCalledWith(acronyms);
  });

  it('should filter our acronyms', async () => {
    await subject.setFilteredAcronyms('aaa');
    expect(acronymStore.setFilteredAcronyms).toHaveBeenCalledWith(
      ['<span style="background: #FFFF00;">AAA</span> - Aaron Allon Arnold']
    );
  });
});