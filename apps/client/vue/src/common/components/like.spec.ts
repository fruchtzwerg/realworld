import { mount } from '@vue/test-utils';

import Like from './like.vue';

describe('Like', () => {
  it('renders properly', () => {
    const wrapper = mount(Like, {});
    expect(wrapper.text()).toContain('Welcome to Like');
  });
});
