import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LandingPage.scss';
import Link from '../../components/Link';

function LandingPage({error}, context) { // eslint-disable-line
  const title = 'Clark.de Survey App';

  context.setTitle(title);

  return (
    <div className={s.container}>
      <div className={s.title}> Welcome to Clark.de survey App </div>
      <div className={s.desc}>
        Try one of these
        <div className={s.surveylink}>
          <Link to="/question/1"> Survey 1 - Car Insurance </Link>
        </div>
        <div className={s.surveylink}>
          <Link to="/question/2"> Survey 2 - Home Insurance</Link>
        </div>
      </div>
    </div>
  );
}

LandingPage.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(LandingPage);
