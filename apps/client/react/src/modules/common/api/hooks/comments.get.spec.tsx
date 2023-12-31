import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useCommentsGet from './comments.get';

describe('useCommentsGet', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useCommentsGet());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
