import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.scss';
import { connect } from 'react-redux';

class Footer extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={s.footerInfo}>
        <div className={s.footerLinkInfo}>
          <div className={s.footerCardInfo}>
            <div className={s.cardDetail}>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  footerContent: React.PropTypes.object,
  populateUserInfo: React.PropTypes.object
};

export default withStyles(s)(connect(({
  updateFooterContent,
  populateUserInfo
}) => {
  return {
    footerContent: updateFooterContent,
    populateUserInfo
  };
})(Footer));
