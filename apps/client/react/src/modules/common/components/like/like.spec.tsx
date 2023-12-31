import { render } from '@testing-library/react';

import Like from './like';

describe('Like', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Like />);
    expect(baseElement).toBeTruthy();
  });
});
