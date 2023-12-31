import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useCommentDelete from './comment.delete';

describe('useCommentDelete', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useCommentDelete());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
