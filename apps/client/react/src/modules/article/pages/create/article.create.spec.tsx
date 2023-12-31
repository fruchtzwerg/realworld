import { render } from '@testing-library/react';

import Crate from './article.create';

describe('Crate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Crate />);
    expect(baseElement).toBeTruthy();
  });
});
