export interface IQueryParams {
  query: string;
  page: number;
  per_page: number;
  order: 'desc' | 'asc';
  sort: '' | 'stars' | 'forks' | 'updated';
}
