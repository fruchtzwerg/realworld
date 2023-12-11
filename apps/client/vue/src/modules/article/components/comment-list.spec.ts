import { mount } from '@vue/test-utils';

import CommentList from './comment-list.vue';

describe('CommentList', () => {
  it('renders properly', () => {
    const wrapper = mount(CommentList, {});
    expect(wrapper.text()).toContain('Welcome to CommentList');
  });
});
