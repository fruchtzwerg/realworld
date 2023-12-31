import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useArticleCreate from './article.create';

describe('useArticleCreate', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useArticleCreate());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
