import { mount } from '@vue/test-utils';

import Feed from './feed.page.vue';

describe('Feed', () => {
  it('renders properly', () => {
    const wrapper = mount(Feed, {});
    expect(wrapper.text()).toContain('Welcome to Feed');
  });
});
