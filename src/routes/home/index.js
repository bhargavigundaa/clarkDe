  import React from 'react';
  // import { catalogDomain, homePageContentUrl } from '../../core/urls';
  import Home from './Home';

  async function getHomePageData() {
    return { key: 'hello world' };
  }


  export default {

    path: '/question/:id',
    async action() {
      const homePageData = await getHomePageData();
      return <Home data={homePageData} />;
    }
  };
