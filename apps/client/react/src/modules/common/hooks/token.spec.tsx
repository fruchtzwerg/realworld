import { act, renderHook } from '@testing-library/react';

import useToken from './token';

describe('useToken', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useToken());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
