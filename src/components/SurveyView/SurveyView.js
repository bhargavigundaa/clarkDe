import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SurveyView.scss';
// import { connect } from 'react-redux';

class SurveyView extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      userProgress: {}
    };
  }

  ComponentDidMount() {
    this.setState({
      qid: this.props.entireQstn.id,
      userProgress: JSON.parse(localStorage.getItem(this.props.entireQstn.id))
    });
  }

  render() {
    const { entireQstn } = this.props;
    return (
      <div className={s.footerInfo}>
        {
          this.state.userProgress.started ?
          <div> I am SurveyView </div>
          :
          <div>
            <div> Welcome to Clark.de survey </div>
            <div> {entireQstn.title} </div>

          </div>
        }
      </div>
    );
  }
}

SurveyView.propTypes = {
  entireQstn: React.PropTypes.object
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
