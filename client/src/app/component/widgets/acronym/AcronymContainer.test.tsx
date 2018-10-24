import * as React from 'react';
import { shallow } from 'enzyme';
import { AcronymContainer } from './AcronymContainer';
import { AcronymModel } from './AcronymModel';

describe('AcronymContainer', () => {
  let acronymStore: any;
  let acronymActions: any;

  beforeEach(() => {
    let acronyms = [
      new AcronymModel(1, 'AAA', 'Aaron Allon Arnold')
    ];

    acronymStore = {
      setAcronyms: jest.fn(),
      acronyms: acronyms
    };

    acronymActions = {
      setAllAcronyms: jest.fn()
    };

    shallow(
      <AcronymContainer
        acronymStore={acronymStore}
        acronymActions={acronymActions}
      />
    );
  });

  it('should set the list of acronyms', () => {
    expect(acronymActions.setAllAcronyms).toHaveBeenCalled();
  });
});