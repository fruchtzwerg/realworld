import { mount } from '@vue/test-utils';

import Author from './author.vue';

describe('Author', () => {
  it('renders properly', () => {
    const wrapper = mount(Author, {});
    expect(wrapper.text()).toContain('Welcome to Author');
  });
});
