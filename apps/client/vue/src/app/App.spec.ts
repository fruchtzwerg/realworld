import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import App from './App.vue';

describe('App', () => {
  it('renders properly', () => {
    const wrapper = mount(App, {});
    expect(wrapper.text()).toContain('Welcome realworld 👋');
  });
});
