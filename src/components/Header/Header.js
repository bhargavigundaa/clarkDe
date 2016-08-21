import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';

class Header extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={s.header}>
        <div className={s.logoInfo}></div>
        <div className={s.heading}>
          Clark Survey App
        </div>
        <div className={s.userName}>
          Hi, Steffen
        </div>
      </div>
    );
  }
}
export default withStyles(s)(Header);
