type Result<T> = {
  result$: Observable<T>;
  result: Signal<T>;
  updateOptions<TQueryFnData, TError, TData, TQueryKey extends QueryKey>(
    options:
      | UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
      | DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
  ): void;
};
