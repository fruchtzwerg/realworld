import { render } from '@testing-library/react';

import ArticleList from './article-list';

describe('ArticleList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ArticleList />);
    expect(baseElement).toBeTruthy();
  });
});
