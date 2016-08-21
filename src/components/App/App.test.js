import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import App from './App';

describe('App', () => {

  it('renders children correctly', () => {
    const wrapper = shallow(
      <Provider
        store={{ insertCss: () => {}, subscribe: () => {},
        dispatch: () => {}, getState: () => {} }}
      >
      <App context={{ store: {} }}>
        <div className="child" />
      </App>
      </Provider>
    );

    expect(wrapper.contains(<div className="child" />)).to.be.true;
  });

});
