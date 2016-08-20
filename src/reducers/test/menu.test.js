/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

/* import { expect } from 'chai';
import { menuPanel, subMenuPanel, menuContent } from '../menu';
import { EXPAND_MENU, FETCH_MENU_CONTENT, EXPAND_SUBMENU_CONTENT } from '../../constants';
import { mockData } from '../../mockData/menuContent';

describe('Menu', () => {
  it('should be able to export all functions', () => {
    const menuPanelFunc = menuPanel && (typeof menuPanel === 'function');
    const subMenuPanelFunc = subMenuPanel && (typeof subMenuPanel === 'function');
    const menuContentFunc = menuContent && (typeof menuContent === 'function');
    expect(menuPanelFunc && subMenuPanelFunc && menuContentFunc).to.eql(true);
  });

  it('should set menu panel as true', () => {
    const initialState = false;
    const newState = menuPanel(initialState, { type: EXPAND_MENU, payload: true });
    expect(newState).to.eql(true);
  });

  it('should set menu panel as false', () => {
    const initialState = true;
    const newState = menuPanel(initialState, { type: EXPAND_MENU, payload: false });
    expect(newState).to.eql(false);
  });

  it('should set sub menu panel as true', () => {
    const initialState = { key: false };
    const newState = subMenuPanel(initialState, { type: EXPAND_SUBMENU_CONTENT, payload: true });
    expect(newState).to.eql({ key: true });
  });

  it('should set sub menu panel as false', () => {
    const initialState = { key: true };
    const newState = subMenuPanel(initialState, { type: EXPAND_SUBMENU_CONTENT, payload: false });
    expect(newState).to.eql({ key: false });
  });

  it('should set menu content', () => {
    const dataFromServer = mockData;
    const initialState = null;
    const newState = menuContent(initialState,
      { type: FETCH_MENU_CONTENT, payload: dataFromServer }
    );
    expect(newState).to.eql(dataFromServer);
  });
});
*/
