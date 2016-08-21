import React from 'react';
import App from '../../components/App';
import LandingPage from './LandingPage';

export default {

  path: '/',

  action({ render, context }) {
    render(
      <App context={context}>
        <LandingPage />
      </App>
    );
  },

};
