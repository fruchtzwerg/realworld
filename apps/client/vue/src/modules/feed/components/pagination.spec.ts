import { mount } from '@vue/test-utils';

import Pagination from './pagination.vue';

describe('Pagination', () => {
  it('renders properly', () => {
    const wrapper = mount(Pagination, {});
    expect(wrapper.text()).toContain('Welcome to Pagination');
  });
});
