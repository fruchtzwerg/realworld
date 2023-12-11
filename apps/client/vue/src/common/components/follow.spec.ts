import { mount } from '@vue/test-utils';

import Follow from './follow.vue';

describe('Follow', () => {
  it('renders properly', () => {
    const wrapper = mount(Follow, {});
    expect(wrapper.text()).toContain('Welcome to Follow');
  });
});
