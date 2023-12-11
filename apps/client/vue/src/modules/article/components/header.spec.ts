import { mount } from '@vue/test-utils';

import Header from './header.vue';

describe('Header', () => {
  it('renders properly', () => {
    const wrapper = mount(Header, {});
    expect(wrapper.text()).toContain('Welcome to Header');
  });
});
