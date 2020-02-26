/**
 * tests/common/utils.spec.ts
 * Unit tests for the 'utils' object.
 * © George Pickering 2020, https://github.com/geopic
 */

import props from '@/common/props';
import { SiteData } from '@/common/types';
import utils from '@/common/utils';

describe('utils', () => {
  const testData: SiteData = { hello: 'world' };
  afterEach(() => localStorage.clear());

  test('loadDataFromLS', () => {
    expect(utils.loadDataFromLS()).toBeNull();
    localStorage.setItem(props.site.lsEntry, JSON.stringify(testData));
    expect(utils.loadDataFromLS()).toEqual(testData);
  });

  test('saveDataToLS', () => {
    utils.saveDataToLS(testData);
    expect(
      JSON.parse(localStorage.getItem(props.site.lsEntry) as string)
    ).toEqual(testData);
  });

  test('clearDataFromLS', () => {
    localStorage.setItem(props.site.lsEntry, JSON.stringify(testData));
    utils.clearDataFromLS();
    expect(localStorage.getItem(props.site.lsEntry)).toBeNull();
  });
});
