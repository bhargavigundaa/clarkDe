import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AppContainer.scss';
import Header from '../Header';

class AppContainer extends Component { //eslint-disable-line
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.object.isRequired,
};

export default withStyles(s)(AppContainer);
