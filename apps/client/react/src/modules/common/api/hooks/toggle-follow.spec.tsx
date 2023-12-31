import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useToggleFollow from './toggle-follow';

describe('useToggleFollow', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useToggleFollow());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
