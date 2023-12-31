import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useArticleGet from './article.get';

describe('useArticleGet', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useArticleGet());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
