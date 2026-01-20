import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './Router';
import { ModalController } from './components/shared/ModalController';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ModalController /> {/* Add this line */}
    </QueryClientProvider>
  );
}

export default App;
