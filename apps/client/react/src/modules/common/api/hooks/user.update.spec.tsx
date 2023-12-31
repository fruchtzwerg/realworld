import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUserUpdate from './user.update';

describe('useUserUpdate', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useUserUpdate());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
