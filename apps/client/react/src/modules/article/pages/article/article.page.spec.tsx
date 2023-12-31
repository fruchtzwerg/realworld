import { render } from '@testing-library/react';

import ArticlePage from './article.page';

describe('ArticlePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ArticlePage />);
    expect(baseElement).toBeTruthy();
  });
});
