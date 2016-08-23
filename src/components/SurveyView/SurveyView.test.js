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

  it('View Should have atlest 5 divs', () => {
    const wrapper = mount(<SurveyView />);
    expect(wrapper.find('div').length).to.be.at.least(5);
  });

  it('Initial state Should have blank userProgress Array', () => {
    const wrapper = shallow(<SurveyView />);
    expect(wrapper.state()).to.eql({ userProgress: [] }); // deep equal check with eql
  });

  it('On servey start question,totalQstn,userProgress,qIndex Should be available in state', () => {
    const wrapper = mount(<SurveyView />);
    const questionMock = require('../../questinaire/question-1.json'); //eslint-disable-line
    // window.localStorage no defined . Mock it
    const localStorage = {};
    localStorage.setItem = () => true;
    localStorage.getItem = () => null;
    GLOBAL.localStorage = localStorage;
    // mock ends
    wrapper.setState({ qid: 1, entireQstn: questionMock, qstnHash: 1 });
    wrapper.find('button').simulate('click');
    
    expect(wrapper.state()).to.include.keys(['question', 'totalQstn', 'userProgress', 'qIndex']);
    expect(wrapper.state()).to.include({
      entireQstn: questionMock,
      totalQstn: 4,
      qIndex: 0
    });
  });

});
