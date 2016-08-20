import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { QUESTION_LOCAL, Q_KEY } from '../../constants';
import { questionPath } from '../../core/urls';
import s from './SurveyView.scss';
import fetch from '../../core/fetch';
import _ from 'lodash';

// import { connect } from 'react-redux';

class SurveyView extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      userProgress: {}
    };
  }

  async componentDidMount() {
    await this.fetchQuestion();
    // alert(JSON.stringify(this.state.entireQstn));
  }

  getEachQuestion = () => {
    const { entireQstn = {} } = this.state;
    const question = _.get(entireQstn, Q_KEY, [])[this.state.userProgress.index];
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
    });
    this.getEachQuestion();
  }

  render() {
    const { entireQstn = {} } = this.state;
    const inProgress = this.state.userProgress.started;
    const { question = {} } = this.state;
    // inProgress && this.getEachQuestion();

    return (
      <div className={s.footerInfo}>
        {
          inProgress ?
          <div>
            <div> {question.text} </div>
            {
              question.type === 'radio' &&
              question.options.map((opt) => {
                return <input type="radio" name={question.name} value={opt} />;
              })
            }
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

// export default withStyles(s)(connect(({
//   updateFooterContent,
//   populateUserInfo
// }) => {
//   return {
//     footerContent: updateFooterContent,
//     populateUserInfo
//   };
// })(SurveyView));
export default withStyles(s)(SurveyView);
