import { IQueryParams } from '~/types/IQueryParams';
import { search } from '~/services';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '~/global-states/redux-hooks/reduxHooks';
import {
  selectQueryResultGlobalState,
  selectQueryGlobalState,
  setQueryResultGlobalState,
  setQueriesGlobalState,
} from '~/global-states/reducer/searchReducer';

export function useSearchHandler() {
  const queries = useAppSelector(selectQueryGlobalState);
  const searchDispatch = useAppDispatch();

  const { data, isFetching } = useQuery(
    ['search', queries],
    () =>
      search.getSearchQuery({
        query: queries.query,
        page: queries.page,
        per_page: queries.per_page,
        order: queries.order,
        sort: queries.sort,
      }),
    {
      enabled: queries.query !== '',
      onSuccess: (res) => {
        if (res)
          searchDispatch(
            setQueryResultGlobalState({
              queryResult: {
                incomplete_results: res.incomplete_results,
                items: res.items,
                total_count: res.total_count,
              },
            }),
          );
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
  const onQuerySubmit = (values: Partial<IQueryParams>) => {
    searchDispatch(
      setQueriesGlobalState({
        ...values,
      }),
    );
  };

  return { queries, onQuerySubmit, data, isFetching };
}
