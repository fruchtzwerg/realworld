import { mount } from '@vue/test-utils';

import ArticleCreate from './create-article.page.vue';

describe('ArticleCreate', () => {
  it('renders properly', () => {
    const wrapper = mount(ArticleCreate, {});
    expect(wrapper.text()).toContain('Welcome to ArticleCreate');
  });
});
