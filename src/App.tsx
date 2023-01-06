import { LayoutComponent } from '~/components/common';
import { SearchPage } from './pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '~/global-states/store/store';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LayoutComponent>
          <SearchPage />
        </LayoutComponent>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
