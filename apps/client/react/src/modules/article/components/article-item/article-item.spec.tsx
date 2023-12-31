import { render } from '@testing-library/react';

import { ArticleItem } from './article-item';

describe('ArticleItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ArticleItem />);
    expect(baseElement).toBeTruthy();
  });
});
