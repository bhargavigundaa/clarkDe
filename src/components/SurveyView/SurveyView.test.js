/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { SurveyView } from './SurveyView';

// eslint-disable-next-line no-underscore-dangle
global.__DEV__ = true;
describe('SurveyView', () => {

  it('SurveyView Component Should Exixts', () => {
    const wrapper = shallow(<SurveyView />);
    expect(wrapper.length).to.be.equal(1); // Shallow wrapper is formed
    expect(wrapper.children().length).to.equal(1); // Shallow wrapper returns only one child
  });

  it('View Should have total 5 divs outside nested JSX', () => {
    const wrapper = mount(<SurveyView />);
    expect(wrapper.find('div').length).to.equal(5);
  });

  it('Initial state Should have blank userProgress Array', () => {
    const wrapper = shallow(<SurveyView />);
    expect(wrapper.state()).to.eql({ userProgress: [] }); // deep equal check with eql
  });

});
