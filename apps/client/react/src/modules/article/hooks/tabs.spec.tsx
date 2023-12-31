import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useTabs from './tabs';

describe('useTabs', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useTabs());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
