import { render } from '@testing-library/react';

import Impression from './impression';

describe('Impression', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Impression />);
    expect(baseElement).toBeTruthy();
  });
});
