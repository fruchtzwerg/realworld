import { mount } from '@vue/test-utils';

import Comment from './comment-shell.vue';

describe('Comment', () => {
  it('renders properly', () => {
    const wrapper = mount(Comment, {});
    expect(wrapper.text()).toContain('Welcome to Comment');
  });
});
