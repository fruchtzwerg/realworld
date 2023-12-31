import { render } from '@testing-library/react';

import FeedHeader from './feed.header';

describe('FeedHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeedHeader />);
    expect(baseElement).toBeTruthy();
  });
});
