import { LayoutComponent } from '~/components/common';
import { SearchPage } from './pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutComponent>
        <SearchPage />
      </LayoutComponent>
    </QueryClientProvider>
  );
}

export default App;
