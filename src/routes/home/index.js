  import React from 'react';
  // import { catalogDomain, homePageContentUrl } from '../../core/urls';
  import SurveyView from '../../components/SurveyView';

  export default {

    path: '/question/:id',
    action() {
      return <SurveyView />;
    }
  };
