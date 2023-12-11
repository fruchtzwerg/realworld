import { mount } from '@vue/test-utils';

import ArticlePage from './article.page.vue';

describe('ArticlePage', () => {
  it('renders properly', () => {
    const wrapper = mount(ArticlePage, {});
    expect(wrapper.text()).toContain('Welcome to ArticlePage');
  });
});
