import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useToggleFavorite from './toggle-favorite';

describe('useToggleFavorite', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useToggleFavorite());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
