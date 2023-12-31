import { render } from '@testing-library/react';

import TagList from './tag-list';

describe('TagList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TagList />);
    expect(baseElement).toBeTruthy();
  });
});
