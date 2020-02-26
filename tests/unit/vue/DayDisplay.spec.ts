/**
 * tests/vue/DayDisplay.spec.ts
 * Unit tests for the 'DayDisplay' component.
 * © George Pickering 2020, https://github.com/geopic
 */

import { shallowMount } from '@vue/test-utils';
import DayDisplay from '@/vue/components/DayDisplay.vue';

const wrapper = shallowMount(DayDisplay, {
  propsData: {
    date: new Date('September 24, 1991 00:00:00')
  }
});

describe(wrapper.name(), () => {
  test('it is a valid Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  test('it displays the date in correct format', () => {
    expect(wrapper.find('.day-display h1').text()).toEqual(
      'Tue. 24th Sep 1991'
    );
  });
});
