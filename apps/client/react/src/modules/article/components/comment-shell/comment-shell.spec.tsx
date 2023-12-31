import { render } from '@testing-library/react';

import CommentShell from './comment-shell';

describe('CommentShell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommentShell />);
    expect(baseElement).toBeTruthy();
  });
});
