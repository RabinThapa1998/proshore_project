import React, { useContext, useState } from 'react';
import { SearchResultContext } from '~/components/context';
import { IQueryParams } from '~/types/IQueryParams';
import { search } from '~/services';
import { useQuery } from '@tanstack/react-query';

export function useSearchHandler() {
  const searchDispatch = useContext(SearchResultContext);

  const order = ['desc', 'asc'];
  const sort = ['', 'stars', 'forks', 'updated'];

  const [queries, setQueries] = useState<IQueryParams>({
    query: '',
    page: 1,
    per_page: 10,
    order: 'desc',
    sort: '',
  });
  console.log('🚀 ~ file: useSearchHandler.tsx:20 ~ useSearchHandler ~ queries', queries);

  const { data, isFetching } = useQuery(
    ['search', queries],
    () =>
      search.getSearchQuery({
        ...queries,
      }),
    {
      enabled: queries.query !== '',
      onSuccess: (res) => {
        console.log('🚀 ~ file: SearchBox.tsx:41 ~ SearchBox ~ res', res);
        if (res)
          searchDispatch({
            payload: {
              incomplete_results: res.incomplete_results,
              items: res.items,
              total_count: res.total_count,
            },
          });
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
  const onQuerySubmit = (values: Partial<IQueryParams>) => {
    setQueries((prev) => ({
      ...prev,
      ...values,
    }));
  };

  return { queries, setQueries, onQuerySubmit, data, isFetching };
}
