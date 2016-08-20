import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { QUESTION_LOCAL, Q_KEY } from '../../constants';
import { questionPath } from '../../core/urls';
import s from './SurveyView.scss';
import fetch from '../../core/fetch';
import _ from 'lodash';

class SurveyView extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      userProgress: {}
    };
  }

  async componentDidMount() {
    await this.fetchQuestion();
  }

  getEachQuestion = () => {
    const { entireQstn = {}, userProgress } = this.state;
    const question = _.get(entireQstn, Q_KEY, [])[userProgress.index];
    this.setState({
      question,
    });
  }

   fetchQuestion = async () => {
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

  initLocalStore(qId) {
    const initState = {
      id: qId,
      started: false
    };
    localStorage.setItem(`${QUESTION_LOCAL}-${qId}`, JSON.stringify(initState));
  }

  startSurvey = () => {
    const userProgress = { ...this.state.userProgress, started: true, index: 0 };
    this.setState({
      userProgress
    }, () => {
      this.getEachQuestion();
    });
  }

  navigateQuestion = (prev) => {
    let { userProgress } = this.state;
    userProgress = { ...userProgress, index: userProgress.index + (prev ? -1 : 1) };
    this.setState({
      userProgress
    }, () => {
      this.getEachQuestion();
    });
  }

  render() {
    const { entireQstn = {} } = this.state;
    const { started } = this.state.userProgress;
    const { question = {} } = this.state;

    return (
      <div className={s.footerInfo}>
        {
          started ?
          <div>
            <div> {question.text} </div>
            {
              // Radio Button
              question.type === 'radio' &&
              question.options.map((opt, ind) => {
                return (
                  <div key={ind}>
                    <input type="radio" name={question.name} value={opt} />{opt}
                  </div>
                );
              })
            }
            {
              // Text Area
              question.type === 'textarea' &&
              <textarea
                rows="4"
                cols="50"
                name={question.name}
              >
              </textarea>
            }
            {
              // Check Boxes
              question.type === 'checkbox' &&
              question.options.map((opt, ind) => {
                return (
                  <div key={ind}>
                    <input type="checkbox" name={question.name} value={opt} />{opt}
                  </div>
                );
              })
            }
            {question.optional && <button onClick={this.skipQuestion}> Skip </button>}
            <button onClick={() => this.navigateQuestion(true)}> Previous </button>
            <button onClick={() => this.navigateQuestion(false)}> Next </button>
          </div>
          :
          <div>
            <div> Welcome to Clark.de survey </div>
            <div> {entireQstn.title} </div>
            <div> {entireQstn.desc} </div>
            <button onClick={this.startSurvey}>Start Survey</button>
          </div>
        }
      </div>
    );
  }
}

SurveyView.propTypes = {
  // entireQstn: React.PropTypes.object
};

export default withStyles(s)(SurveyView);
