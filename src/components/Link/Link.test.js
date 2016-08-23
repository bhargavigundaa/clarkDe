// /* eslint-env mocha */
// /* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import Link from './Link';

// eslint-disable-next-line no-underscore-dangle
global.__DEV__ = true;

describe('Component: <Link />', () => {
  it('Should receive props', () => {
    const wrapper = shallow(
      <Provider
        store={{ insertCss: () => {}, subscribe: () => {},
        dispatch: () => {}, getState: () => {} }}
      >
        <div>
          <Link />
        </div>
      </Provider>
    );
    expect(wrapper.props()).to.be.defined; //eslint-disable-line
  });
});
