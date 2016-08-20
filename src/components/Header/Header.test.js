/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import Header from './Header';

// eslint-disable-next-line no-underscore-dangle
global.__DEV__ = true;

describe('Component: <Header/>', () => {

  it('shallow render of Header length', () => {
    const wrapper = shallow(
      <Provider
        store={{ insertCss: () => {}, subscribe: () => {},
        dispatch: () => {}, getState: () => {} }}
      >
      <div>
      <Header />
      </div>
      </Provider>
      );
    expect(wrapper.length).to.be.equal(1);
    expect(wrapper.children().length).to.equal(1); // Shallow wrapper returns only one child
  });
  it('should have props', () => {
    const wrapper = shallow(
      <Provider
        store={{ insertCss: () => {}, subscribe: () => {},
        dispatch: () => {}, getState: () => {} }}
      >
      <div>
      <Header />
      </div>
      </Provider>
      );
    expect(wrapper.props().expandMenu).to.be.defined;
    expect(wrapper.props().expandSearch).to.be.defined;
  });
});
