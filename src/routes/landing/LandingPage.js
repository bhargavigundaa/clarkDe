import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LandingPage.scss';
import Link from '../../components/Link';

function LandingPage({error}, context) { // eslint-disable-line
  const title = 'Clark.de Survey App';

  context.setTitle(title);

  return (
    <div className={s.container}>
      <div className={s.title}> Looks like you haven't tried valid survey URL </div>
      <div className={s.desc}>
        Try <Link to="/question/1"> Survey1 </Link> or <Link to="/question/2"> Survey2 </Link>
      </div>
    </div>
  );
}

LandingPage.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(LandingPage);
