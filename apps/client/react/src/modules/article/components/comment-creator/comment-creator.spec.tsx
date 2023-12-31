import { render } from '@testing-library/react';

import CommentCreator from './comment-creator';

describe('CommentCreator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommentCreator />);
    expect(baseElement).toBeTruthy();
  });
});
