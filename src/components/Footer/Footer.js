import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.scss';

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

export default withStyles(s)(Footer);
