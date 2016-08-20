/**
 * Created by avinash on 5/8/16.
 */

/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import { expect } from 'chai';
import {
  stringifyQueryParams,
  addStaticKeys,
  addGenericKeys,
  getResizeUrl,
  getCookie,
  getParameterByName,
  urlMapper,
  urlTypeToTarget
} from '../utils';

// eslint-disable-next-line no-underscore-dangle
global.__DEV__ = true;

describe('Stringify Object to url Query Params', () => {
  it('should stringify to query params from object', () => {
    const obj = {
      aBoolean: true,
      aString: 'web',
      aNumber: 1,
      anEmptyString: '',
      nullValue: null
    };

    const objectWithNestedObject = {
      aBoolean: true,
      anObject: {
        first: 1
      },
      nullValue: null
    };

    // Object without nesting is handled by this utility
    expect(stringifyQueryParams(obj)).to.be.equal('?aBoolean=true&aString=web&aNumber=1');

    // Object with nesting is not handled by this utility
    expect(stringifyQueryParams(objectWithNestedObject)).to.be.
      equal('?aBoolean=true&anObject=[object Object]');
  });
});

describe('AddStaticKeysUtil', () => {
  it('should add static keys to a source object', () => {
    const obj = {
      first: 1,
      second: 'second'
    };

    const resObj = {
      first: 1,
      second: 'second',
      page_count: 1,
      items_per_page: 30,
      resolution: '960x720',
      quality: 'high',
      curated: 1
    };

    expect(addStaticKeys(obj)).to.be.eql(resObj);
  });
});

describe('AddGenericKeysUtil', () => {
  it('should add generic keys to a source object', () => {
    const obj = {
      first: 1,
      second: 'second'
    };

    const resObj = {
      cat_tree: 1,
      channel: 'web',
      child_site_id: 1,
      first: 1,
      second: 'second',
      site_id: 1
    };

    expect(addGenericKeys(obj)).to.be.eql(resObj);
  });
});

describe('getResizeUrl', () => {
  it('should modify url to add mentioned diemnsions to url', () => {
    const url = 'https://assetscdn.clarkde.com/images/catalog/view_item/61857/1469245540259.jpg';
    const urlExp = 'https://assetscdn.clarkde.com/images/catalog/view_item/61857/700x1000/1469245540259.jpg';
    expect(getResizeUrl(url, 700, 1000)).to.be.eql(urlExp);
  });
});

describe('getcookie', () => {
  it('should return the value of the parameter passed from the cookie', () => {
    expect(getCookie('_ga')).to.be.equal(null);
  });
});

describe('getParameterByName', () => {
  it('should return the value of the given parameter from the url', () => {
    const url = 'http://clarkde.com/v1/api/cart?channel=web&version=2';
    expect(getParameterByName('channel', url)).to.be.equal('web');
    expect(getParameterByName('abc', url)).to.be.equal(null);
    expect(getParameterByName('channel')).to.be.equal(null);
  });
});

describe('urlMapper', () => {
  it('should map url to required form', () => {
    const itemEmbed = {
      seourl: 'https://clarkde.com/shop/p/suzuki-all-new-access-125-mat-fibroin-gray-SCOSUZUKI-ALL-NSHAI272310E295E761',
      status: 1,
      url_type: 'embed'
    };
    const expectedEmbed = 'https://clarkde.com/shop/p/suzuki-all-new-access-125-mat-fibroin-gray-SCOSUZUKI-ALL-NSHAI272310E295E761';

    const itemEmbed2 = {
      seourl: 'https://catalog.clarkde.com/shop/p/suzuki-all-new-access-125-mat-fibroin-gray-SCOSUZUKI-ALL-NSHAI272310E295E761',
      status: 1,
      url_type: 'embed'
    };
    const expectedEmbed2 = itemEmbed2.seourl;

    const itemNoLink = {
      seourl: 'https://catalog.clarkde.com/v1/shop/p/suzuki-all-new-access-125-mat-fibroin-gray-SCOSUZUKI-ALL-NSHAI272310E295E761',
      status: 1,
      url_type: 'noLink'
    };
    const expectedNoLink =
      '/shop/p/suzuki-all-new-access-125-mat-fibroin-gray-SCOSUZUKI-ALL-NSHAI272310E295E761';

    const itemHome = {
      seourl: 'https://catalog.clarkde.com/v1/h/bazaar',
      status: 1,
      url_type: 'homepage'
    };
    const expectedHome = '/shop/h/bazaar';

    const itemNone = {
      url_type: 'something'
    };

    expect(urlMapper(itemEmbed)).to.be.equal(expectedEmbed);
    expect(urlMapper(itemEmbed2)).to.be.equal(expectedEmbed2);
    expect(urlMapper(itemNoLink)).to.be.equal(expectedNoLink);
    expect(urlMapper(itemHome)).to.be.equal(expectedHome);
    expect(urlMapper(itemNone)).to.be.equal('/shop/undefined');
  });
});

describe('urlTypeToTarget', () => {
  it('should return expected target type for link', () => {
    expect(urlTypeToTarget({ url_type: 'external' })).to.be.equal('_blank');
    expect(urlTypeToTarget({ url_type: 'embed' })).to.be.equal('_blank');
    expect(urlTypeToTarget({ url_type: 'somethingRandom' })).to.be.equal(null);
    expect(urlTypeToTarget({})).to.be.equal(null);
  });
});
