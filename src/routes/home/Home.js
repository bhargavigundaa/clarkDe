import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';
import { connect } from 'react-redux';
import { QUESTION_URL_PARAM } from '../../constants';
import fetch from '../../core/fetch';
import { questionPath } from '../../core/urls';
import GeneralView from '../../components/GeneralView';
import SurveyView from '../../components/SurveyView';

// import _ from 'lodash';

class Home extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const question = window.location.pathname.split('/')[2];
    if (question) {
      const response = await fetch(`${questionPath}${question}`);
      const data = await response.json();
      this.initLocalStore(data.id);
      this.setState({ //eslint-disable-line
        seeingQuestion: true,
        qid: data.id,
        entireQstn: data
      });
    }
  }

  componentWillReceiveProps() {
  }

  initLocalStore(qId) {
    const initState = {
      id: qId,
      started: false
    };
    localStorage.setItem(`${QUESTION_URL_PARAM}-${qId}`, JSON.stringify(initState));
  }

  render() {
    return (
      <div className={s.container}>
       {
        this.state.seeingQuestion ?
          <SurveyView entireQstn={this.state.entireQstn} />
          :
          <GeneralView />
       }
      </div>
    );
  }

}

Home.propTypes = {
  data: React.PropTypes.object
};

export default withStyles(s)(connect((state) => {
  return {
    a: state.a
  };
}, (dispatch) => {
  return {
    b: () => {
      dispatch(null);
    }
  };
})(Home));

/*

Concepts:

- Questionnaire

- A Questionnaire has a title and a description

- A questionnaire has a defined sequence of question that need to be answered

- Question

- 3 different types of questions are supported: Freetext, Multiple choice (single answer), Multiple

choice (multi answer)

- Questions can be flagged to have a mandatory answer

- Question has a description

- For Multiple Choice, each choice has a descriptive label that is shown to the user

Requirements:

- As a user when I start the questionnaire I see a view with title, description and a CTA to start

- As a user I can answers questions very swiftly so that I don’t feel like I am wasting my time

- As a user I want the questionnaire to work dependable when I have bad network connectivity

- The questionnaire definition is based on a JSON structure that the frontend uses to drive the questions,

a good reference for a JSON might be here: http://docs.typeform.io/docs/introduction

- As a user I can go back to a previous question without losing the answers I have given in a current

question

- Mobile First, one of the pages contains an SVG, uses JS ES 6-7, naming convention for CSS

*/
