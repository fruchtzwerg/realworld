import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useArticlesGet from './articles.get';

describe('useArticlesGet', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useArticlesGet());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
