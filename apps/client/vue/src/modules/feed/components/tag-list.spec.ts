import { mount } from '@vue/test-utils';

import TagList from './tag-list.vue';

describe('TagList', () => {
  it('renders properly', () => {
    const wrapper = mount(TagList, {});
    expect(wrapper.text()).toContain('Welcome to TagList');
  });
});
