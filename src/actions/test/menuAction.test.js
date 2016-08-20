/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import { expect } from 'chai';
import { expandMenu, expandSubMenu } from '../menuAction';
import { EXPAND_MENU, EXPAND_SUBMENU_CONTENT } from '../../constants';

describe('Menu Actions', () => {

  it('should create action to expand menu', () => {
    const expectedObj = {
      type: EXPAND_MENU,
      payload: true
    };
    expect(expandMenu(true)).to.deep.equal(expectedObj);
  });

  it('should create action to expand sub menu', () => {
    const expectedObj = {
      type: EXPAND_SUBMENU_CONTENT,
      payload: true
    };
    expect(expandSubMenu(true)).to.deep.equal(expectedObj);
  });

});
