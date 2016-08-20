/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import Footer from './Footer';
import configureStore from '../../store/configureStore';

// eslint-disable-next-line no-underscore-dangle
global.__DEV__ = true;

describe('Component: <Footer/>', () => {
  const store = configureStore({ runtime: 2323232 }, {
    cookie: 'randomCookieValue', insertCss: () => {
    }, subscribe: () => {}
  });
  const childContextTypes = {
    insertCss: React.PropTypes.func.isRequired,
    store: () => store
  };

  it('shallow render of Footer', () => {
    const wrapper = shallow(
      <Provider
        store={{ insertCss: () => {}, subscribe: () => {},
        dispatch: () => {}, getState: () => {} }}
      >
      <div>
      <Footer />
      </div>
      </Provider>
      );
    expect(wrapper.length).to.be.equal(1);
    expect(wrapper.children().length).to.equal(1); // Shallow wrapper returns only one child
  });
  it('Should have <div> tag in footer section', () => {
    const wrapper = mount(
      <Footer />, {
        context: {
          store, insertCss: () => {
          }
        }, childContextTypes
      }
    );
    expect(wrapper.length).to.be.equal(1);
    expect(wrapper.isEmpty()).to.equal(false);
    expect(wrapper.find('div').length).to.equal(11);
  });
  it('Should have <a> tags in footer section', () => {
    const wrapper = mount(
      <Footer />, {
        context: {
          store, insertCss: () => {
          }
        }, childContextTypes
      }
    );
    expect(wrapper.find('a').length).to.equal(21);
  });
});
