import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { QUESTION_LOCAL, Q_KEY } from '../../constants';
import { questionPath } from '../../core/urls';
import s from './SurveyView.scss';
import fetch from '../../core/fetch';
import _ from 'lodash';

class SurveyView extends Component { // eslint-disable-line

  constructor(props) {
    super(props);
    this.state = {
      userProgress: {}
    };
  }

  async componentDidMount() {
    await this.fetchAllQuestions();
  }

  getEachQuestion = () => {
    const { entireQstn = {}, qIndex } = this.state;
    const allQuestion = _.get(entireQstn, Q_KEY, []);
    const question = allQuestion[qIndex];
    this.setState({
      question,
      totalQstn: allQuestion.length - 1
    });
  }

   fetchAllQuestions = async () => {
    const question = window.location.pathname.split('/')[2];
    if (question) {
      const response = await fetch(`${questionPath}${question}`);
      const data = await response.json();
      this.initLocalStore(data.id);
      this.setState({
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
    this.setState({
      qIndex: 0
    }, () => {
      this.getEachQuestion();
    });
  }

  navigateQuestion = (prev) => {
    const { qIndex, userProgress } = this.state;
    this.setState({
      qIndex: qIndex + (prev ? -1 : 1)
    }, () => {
      this.getEachQuestion();
    });
    if (!prev) {
      // const captureInput = {
      //   qIndex: qIndex + 1,

      // }
    }
  }

  captureInput = (e) => {
    const { value, name, type } = e.target;
    if (type !== 'checkbox') {
      this.userInput = { [name]: value };
    } else {
      const prevVal = _.get(this.userInput, name, []);
      prevVal.includes(value) && _.remove(prevVal, (v) => v === value) || prevVal.push(value);
      this.userInput = { [name]: prevVal };
    }
    console.log(this.userInput);
  }

  render() {
    const { entireQstn = {}, qIndex, totalQstn } = this.state;
    const { question = {} } = this.state;

    return (
      <div className={s.footerInfo}>
        {
          qIndex >= 0 ?
          <div>
            <div> {question.text} </div>
            {
              // Radio Button
              question.type === 'radio' &&
              question.options.map((opt, ind) => {
                return (
                  <div key={ind}>
                    <input
                      type="radio"
                      name={question.name}
                      value={opt}
                      onChange={this.captureInput}
                    />{opt}
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
                onChange={this.captureInput}
              >
              </textarea>
            }
            {
              // Check Boxes
              question.type === 'checkbox' &&
              question.options.map((opt, ind) => {
                return (
                  <div key={ind}>
                    <input
                      type="checkbox"
                      onChange={this.captureInput}
                      name={question.name}
                      value={opt}
                    />{opt}
                  </div>
                );
              })
            }
            <div>
              {question.optional &&
                <button onClick={this.skipQuestion}> Skip </button>
              }
              {qIndex > 0 && qIndex <= totalQstn &&
                <button onClick={() => this.navigateQuestion(true)}> Previous </button>
              }
              {qIndex <= totalQstn &&
                <button onClick={() => this.navigateQuestion(false)}> Next </button>
              }
            </div>
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
export default withStyles(s)(SurveyView);
