import { mount } from '@vue/test-utils';

import ArticleList from './article-list.vue';

describe('ArticleList', () => {
  it('renders properly', () => {
    const wrapper = mount(ArticleList, {});
    expect(wrapper.text()).toContain('Welcome to ArticleList');
  });
});
