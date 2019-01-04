import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AdminAcronymRow } from './AdminAcronymRow';
import { StyledDeleteAcronymButton } from '../../button/DeleteAcronymButton';
import { AcronymModel } from './AcronymModel';

describe('AdminAcronymRow', () => {
  let subject: ShallowWrapper;
  let acronym: AcronymModel;

  beforeEach(() => {
    acronym = new AcronymModel(0, 'AAA', 'Armadillos Are Awesome', 'AAA - Armadillos Are Awesome');
    subject = shallow(
      <AdminAcronymRow
        acronym={acronym}
        onDeleteClick={() => { return; }}
      />
    );
  });

  it('should contain a delete trashcan', () => {
    expect(subject.find(StyledDeleteAcronymButton).exists()).toBeTruthy();
  });

  it('should have acronym, definition, and action columns', () => {
    expect(subject.find('.acronymColumn').exists()).toBeTruthy();
    expect(subject.find('.definitionColumn').exists()).toBeTruthy();
    expect(subject.find('.actionColumn').exists()).toBeTruthy();
  });

});