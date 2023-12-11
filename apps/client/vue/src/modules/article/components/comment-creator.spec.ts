import { mount } from '@vue/test-utils';

import CommentCreator from './comment-creator.vue';

describe('CommentCreator', () => {
  it('renders properly', () => {
    const wrapper = mount(CommentCreator, {});
    expect(wrapper.text()).toContain('Welcome to CommentCreator');
  });
});
