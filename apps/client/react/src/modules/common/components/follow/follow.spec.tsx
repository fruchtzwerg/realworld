import { render } from '@testing-library/react';

import Follow from './follow';

describe('Follow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Follow />);
    expect(baseElement).toBeTruthy();
  });
});
