export const QueryKeyFactory = {
  user: {
    get: (...queryKey: unknown[]) => ['user', ...queryKey],
  },
  article: {
    get: (...queryKey: unknown[]) => ['article', ...queryKey],
    getAll: (...queryKey: unknown[]) => ['articles', ...queryKey],
  },
  feed: {
    getAll: (...queryKey: unknown[]) => ['feed', ...queryKey],
  },
  profile: {
    get: (...queryKey: unknown[]) => ['profile', ...queryKey],
  },
  tag: {
    getAll: (...queryKey: unknown[]) => ['tags', ...queryKey],
  },
  comment: {
    getAll: (...queryKey: unknown[]) => ['comments', ...queryKey],
  },
};
