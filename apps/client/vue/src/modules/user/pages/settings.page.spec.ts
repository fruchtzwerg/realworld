import { mount } from '@vue/test-utils';

import UserSettings from './settings.page.vue';

describe('UserSettings', () => {
  it('renders properly', () => {
    const wrapper = mount(UserSettings, {});
    expect(wrapper.text()).toContain('Welcome to UserSettings');
  });
});
