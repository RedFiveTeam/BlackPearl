import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AdminAcronymRow } from './AdminAcronymRow';
import { AcronymModel } from './AcronymModel';
import { DeleteIcon } from '../../../icon/DeleteIcon';
import { EditIcon } from '../../../icon/EditIcon';

describe('AdminAcronymRow', () => {
  let subject: ReactWrapper;
  let acronym: AcronymModel;

  beforeEach(() => {
    acronym = new AcronymModel(5, 'AAA', 'Armadillos Are Awesome', 'AAA - Armadillos Are Awesome');
    subject = mount(
      <table>
        <tbody>
        <AdminAcronymRow
          acronym={acronym}
          onDeleteClick={() => {
            return;
          }}
          onSaveClick={() => {
            return;
          }}
          onEditClick={() => {
            return;
          }}
          clearEdit={false}
        />
        </tbody>
      </table>
    );
  });

  it('should contain an edit and delete trashcan', () => {
    expect(subject.find(DeleteIcon).exists()).toBeTruthy();
    expect(subject.find(EditIcon).exists()).toBeTruthy();
  });

  it('should switch to edit mode when edit is clicked', async () => {
    await (subject.find(AdminAcronymRow).instance() as AdminAcronymRow).editClicked();

    expect(subject.find('.actionColumn').html()).toContain('confirmAcronymButton');
    expect(subject.find('.actionColumn').html()).toContain('cancelAcronymButton');
  });

  it('should switch to normal mode when cancel is clicked', async () => {
    await (subject.find(AdminAcronymRow).instance() as AdminAcronymRow).cancelClicked();

    expect(subject.find('.actionColumn').html()).toContain('editAcronymButton');
    expect(subject.find('.actionColumn').html()).toContain('deleteAcronymButton');
  });

  it('should have acronym, definition, and action columns', () => {
    expect(subject.find('.acronymColumn').exists()).toBeTruthy();
    expect(subject.find('.definitionColumn').exists()).toBeTruthy();
    expect(subject.find('.actionColumn').exists()).toBeTruthy();
  });

});