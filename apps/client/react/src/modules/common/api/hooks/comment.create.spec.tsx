import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useCommentCreate from './comment.create';

describe('useCommentCreate', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useCommentCreate());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
