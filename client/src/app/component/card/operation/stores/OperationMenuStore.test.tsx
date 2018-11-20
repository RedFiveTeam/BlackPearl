import { OperationMenuStore } from './OperationMenuStore';

describe('OperationMenuStore', () => {
  let subject: OperationMenuStore;

  beforeEach(() => {
    subject = new OperationMenuStore();
  });

  it('should default menu visibility to false', () => {
    expect(subject.menuVisible).toBeFalsy();
  });

  it('should toggle the menu visibility', () => {
    subject.toggleMenuVisibility();
    expect(subject.menuVisible).toBeTruthy();
    subject.toggleMenuVisibility();
    expect(subject.menuVisible).toBeFalsy();
  });

  it('should turn menu visibility on and off', () => {
    subject.menuVisibilityOn();
    expect(subject.menuVisible).toBeTruthy();
    subject.menuVisibilityOff();
    expect(subject.menuVisible).toBeFalsy();
  });
});