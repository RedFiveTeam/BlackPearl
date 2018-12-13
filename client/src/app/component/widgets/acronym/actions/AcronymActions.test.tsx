import { AcronymActions } from './AcronymActions';
import { StubAcronymRepository } from '../repositories/StubAcronymRepository';
import { AcronymRepository } from '../repositories/AcronymRepository';
import { AcronymModel } from '../AcronymModel';

describe('AcronymActions', () => {
  let subject: AcronymActions;
  let acronymStore: any;
  let acronymRepository: AcronymRepository;
  let acronyms: AcronymModel[];

  beforeEach(() => {
    acronyms = [
      new AcronymModel(1, 'AAA', 'Aaron Allon Arnold'),
      new AcronymModel(2, 'BBB', 'Baron Bllon Brnold'),
      new AcronymModel(3, 'CCC', 'Crazy Cronin Creep'),
      new AcronymModel(4, 'DDD', 'Dank Dylan Does')
    ];

    acronymStore = {
      setAcronyms: jest.fn(),
      setFilteredAcronyms: jest.fn(),
      acronyms: acronyms,
      setPendingDelete: jest.fn()
    };

    acronymRepository = new StubAcronymRepository();
    acronymRepository.deleteAcronym = jest.fn();

    subject = new AcronymActions({acronymStore} as any, {acronymRepository} as any);
  });

  it('should set the list of acronyms', async () => {
    await subject.setAllAcronyms();
    expect(acronymStore.setAcronyms).toHaveBeenCalled();
  });

  it('should filter our acronyms', async () => {
    await subject.setFilteredAcronyms('aaa');
    expect(acronymStore.setFilteredAcronyms).toHaveBeenCalledWith(
      ['<span id="1"><span class="searchMatch" style="background: #FFFF00;">AAA</span> - Aaron Allon Arnold</span>']
    );
  });

  it('should delete an acronym', async() => {
    await subject.deleteAcronym(acronymStore.acronyms[0].id);
    expect(acronymRepository.deleteAcronym).toHaveBeenCalled();
  });
});