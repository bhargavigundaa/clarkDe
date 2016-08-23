/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';
import { Header } from './Header';

// eslint-disable-next-line no-underscore-dangle
global.__DEV__ = true;

describe('Component: <Header/>', () => {
  it('View Should have atlest 4 divs', () => {
    const wrapper = render(<Header />);
    expect(wrapper.find('div').length).to.be.eql(4);
  });
});
