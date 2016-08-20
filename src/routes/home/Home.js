import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';
import { connect } from 'react-redux';
import { getParameterByName } from '../../core/utils';
import { QUESTION_URL_PARAM } from '../../constants';
import fetch from '../../core/fetch';
import { questionPath } from '../../core/urls';
// import { updateGaKey, updateFooter } from '../../actions';

// import _ from 'lodash';

class Home extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const question = getParameterByName(QUESTION_URL_PARAM);
    if (question) {
      const response = await fetch(`${questionPath}${question}`);
      const data = await response.json();
      alert(JSON.stringify(data));
    }
  }

  componentWillReceiveProps() {
  }

  render() {
    return (
      <div className={s.container}>
        Hello world {this.props.data.key}
      </div>
    );
  }

}

Home.propTypes = {
  data: React.PropTypes.object
};

export default withStyles(s)(connect((state) => {
  return {
    a: state.a
  };
}, (dispatch) => {
  return {
    b: () => {
      dispatch(null);
    }
  };
})(Home));
