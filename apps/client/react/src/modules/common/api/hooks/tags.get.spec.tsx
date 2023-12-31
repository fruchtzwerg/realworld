import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useTagsGet from './tags.get';

describe('useTagsGet', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useTagsGet());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
