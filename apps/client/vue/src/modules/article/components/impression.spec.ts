import { mount } from '@vue/test-utils';

import Impression from './impression.vue';

describe('Impression', () => {
  it('renders properly', () => {
    const wrapper = mount(Impression, {});
    expect(wrapper.text()).toContain('Welcome to Impression');
  });
});
