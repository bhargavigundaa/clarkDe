import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { QUESTION_LOCAL, Q_KEY } from '../../constants';
import { questionPath, answerPath } from '../../core/urls';
import s from './SurveyView.scss';
import fetch from '../../core/fetch';
import _ from 'lodash';

class SurveyView extends Component { // eslint-disable-line

  constructor(props) {
    super(props);
    this.state = {};
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
    const qstnHash = window.location.pathname.split('/')[2];
    if (qstnHash) {
      const response = await fetch(`${questionPath}${qstnHash}`);
      const data = await response.json();
      this.setState({
        qid: data.id,
        entireQstn: data,
        qstnHash
      });
    }
  }

  initLocalStore = () => {
    const initState = {
      id: this.state.qid,
      userProgress: [],
      qIndex: 0
    };
    this.storeKey = `${QUESTION_LOCAL}-${this.state.qid}`;
    localStorage.setItem(this.storeKey, JSON.stringify(initState));
  }

  startSurvey = () => {
    this.setState({
      qIndex: 0
    }, () => {
      this.initLocalStore();
      this.getEachQuestion();
    });
  }

  navigateQuestion = (prev) => {
    let { qIndex } = this.state;
    const captureInput = {
      qIndex,
      userInput: this.userInput
    };

    let prevState = localStorage.getItem(this.storeKey);
    prevState = JSON.parse(prevState);
    const userProgress = prevState.userProgress;

    _.remove(userProgress, (eachInp) => eachInp.qIndex === qIndex);
    userProgress.push(captureInput);
    prevState = { ...prevState, userProgress };
    console.log(prevState);
    localStorage.setItem(this.storeKey, JSON.stringify(prevState));

    qIndex = qIndex + (prev ? -1 : 1);
    this.setState({
      qIndex
    }, () => {
      this.getEachQuestion();
    });
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
  }

  handleSubmit = () => {
    const reqHeader = new Headers();
    reqHeader.append('Content-Type', 'application/json');
    const data = localStorage.getItem(this.storeKey);
    fetch(`${answerPath}${this.state.qstnHash}`, {
      method: 'POST',
      body: data,
      headers: reqHeader
    }).then((response) => {
      if (!response.ok) {
        alert('Couldn\'t submit the survey . Please try again');
        return false;
      }
      localStorage.removeItem(this.storeKey);
      alert(' Survey submitted successfully');
    });
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
              {qIndex > totalQstn &&
                <div>
                  <div> You have successfully completed the survey</div>
                  <button onClick={this.handleSubmit}> Submit </button>
                </div>
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
