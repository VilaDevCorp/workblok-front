import Body from './Body';
import { ApiProvider } from './hooks/useApi';
import { AuthProvider } from './hooks/useAuth';
import { MiscProvider } from './hooks/useMisc';
import { ScreenProvider } from './hooks/useScreen';
import '../src/index.css'; // replace with the name of your tailwind css file
import { ApiErrorProvider } from './hooks/useApiError';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })
const queryClient = new QueryClient()

function App() {
  return (<>
    <ScreenProvider>
      <MiscProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ApiErrorProvider>
              <ApiProvider>
                <ChakraProvider theme={theme}>
                  <Body />
                </ChakraProvider>
              </ApiProvider>
            </ApiErrorProvider>
          </AuthProvider>
        </QueryClientProvider>
      </MiscProvider>
    </ScreenProvider>
  </>
  );
}

export default App;
