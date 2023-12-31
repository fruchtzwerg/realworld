import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useRegister from './register';

describe('useRegister', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useRegister());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
