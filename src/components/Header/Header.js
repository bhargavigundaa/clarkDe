import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';
import { connect } from 'react-redux';
// import _ from 'lodash';

class Header extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { header, menuInfo, logoInfo, topRightInfo } = s;
    return (
      <div className={header}>
        <div className={menuInfo}>
          <span
            className={'iconMenu iconSp cursor'}
          >
          </span>
        </div>
        <div
          className={logoInfo}
          target="_self"
        >
          <span className={'iconPaytm iconSp'}>
          </span>
        </div>
        <div className={topRightInfo}>
        </div>
      </div>
    );
  }
}

Header.contextTypes = { store: PropTypes.object.isRequired };

Header.propTypes = {

};


export default withStyles(s)(connect(({ a }) => {
    return {
      a
    };
  },
  (dispatch) => {
    return {
      a: () => {
        dispatch(null);
      }
    };
  })(Header));
