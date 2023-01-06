import { LayoutComponent } from '~/components/common';
import { SearchPage, SearchDetailPage } from './pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '~/global-states/store/store';
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <LayoutComponent>
        <SearchPage />
      </LayoutComponent>
    ),
  },
  {
    path: '/:id',
    element: (
      <LayoutComponent>
        <SearchDetailPage />
      </LayoutComponent>
    ),
  },
]);
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
