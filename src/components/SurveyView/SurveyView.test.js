/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { SurveyView } from './SurveyView';
import { Provider } from 'react-redux';

// eslint-disable-next-line no-underscore-dangle
global.__DEV__ = true;
describe('SurveyView', () => {
  const props = {
  };

  it('should shallow render', () => {
    const wrapper = shallow(
      <Provider
        store={{ insertCss: () => {}, subscribe: () => {},
        dispatch: () => {}, getState: () => {} }}
      >
        <div><SurveyView {...props} />
        </div>
      </Provider>
    );
    expect(wrapper.length).to.be.equal(1); // Shallow wrapper is formed
    expect(wrapper.children().length).to.equal(1); // Shallow wrapper returns only one child
  });
  it('Should have props of SurveyView', () => {
    const wrapper = shallow(
      <Provider
        store={{ insertCss: () => {}, subscribe: () => {},
        dispatch: () => {}, getState: () => {} }}
      >
        <div>
          <SurveyView />
        </div>
      </Provider>
    );
    expect(wrapper.props().expandSearch).to.be.defined;
  });
  it('Should have <div> tag', () => {
    const wrapper = shallow(
      <Provider
        store={{ insertCss: () => {}, subscribe: () => {},
        dispatch: () => {}, getState: () => {} }}
      >
        <div>
          <SurveyView />
        </div>
      </Provider>
    );
    expect(wrapper.find('div').length).to.be.equal(1);
  });

});
