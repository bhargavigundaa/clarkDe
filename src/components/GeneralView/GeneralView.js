import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GeneralView.scss';
// import { connect } from 'react-redux';

class GeneralView extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={s.footerInfo}>
        I am GeneralView
      </div>
    );
  }
}

GeneralView.propTypes = {
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
export default withStyles(s)(GeneralView);
