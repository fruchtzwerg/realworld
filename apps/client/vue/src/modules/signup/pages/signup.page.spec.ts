import { mount } from '@vue/test-utils';

import Signup from './signup.page.vue';

describe('Signup', () => {
  it('renders properly', () => {
    const wrapper = mount(Signup, {});
    expect(wrapper.text()).toContain('Welcome to Signup');
  });
});
