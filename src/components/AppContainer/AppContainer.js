import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AppContainer.scss';
import { connect } from 'react-redux';
import Header from '../Header';
import Footer from '../Footer';
// import { populateUserInfo, saveTopBarData,
//          openLogin, expandMenu } from '../../actions';
// import history from '../../core/history';
// import _ from 'lodash';


class AppContainer extends Component {

  componentDidMount() {
    window.onerror = this.onJSError;
  }

  onJSError(errorMsg = '', url = '', lineNumber = '', column = '', errorObj = '') {
    const message = `Error:  ${errorMsg} Script: ${url}  Line: ${lineNumber} Column: ${column}
      StackTrace: ${errorObj}`;
    window.dataLayer.push({
        event: 'jsError',
        message
    });
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.object.isRequired,
};

export default withStyles(s)(
  connect((state) => {
    return {
      a: state.a
    };
  })(AppContainer));
