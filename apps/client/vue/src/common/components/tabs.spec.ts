import { mount } from '@vue/test-utils';

import Tabs from './tabs.vue';

describe('Tabs', () => {
  it('renders properly', () => {
    const wrapper = mount(Tabs, {});
    expect(wrapper.text()).toContain('Welcome to Tabs');
  });
});
