import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUserGet from './user.get';

describe('useUserGet', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useUserGet());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
