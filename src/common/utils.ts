/**
 * src/common/utils.ts
 * Global functions, a.k.a. 'utils'.
 * © George Pickering 2020, https://github.com/geopic
 */

import props from '@/common/props';
import { SiteData } from '@/common/types';

export default {
  /**
   * Get data from localStorage.
   * @returns The data from localStorage.
   */
  loadDataFromLS(): SiteData | undefined {
    return JSON.parse(localStorage.getItem(props.site.lsEntry) as string);
  },

  /**
   * Save data to localStorage.
   * @param data The data to save to localStorage.
   */
  saveDataToLS(data: SiteData) {
    localStorage.setItem(props.site.lsEntry, JSON.stringify(data));
  }
};
