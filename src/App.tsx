import Body from "./Body";
import { ApiProvider } from "./hooks/useApi";
import { AuthProvider } from "./hooks/useAuth";
import { MiscProvider } from "./hooks/useMisc";
import { ScreenProvider } from "./hooks/useScreen";
import "../src/index.css"; // replace with the name of your tailwind css file
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./ChakraTheme";
import moment from "moment";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

moment.locale('en', {
  week: {
    dow: 1,
  },
});


function App() {
  return (
    <>
      <ScreenProvider>
        <MiscProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ApiProvider>
                <ChakraProvider theme={theme}>
                  <Body />
                </ChakraProvider>
              </ApiProvider>
            </AuthProvider>
          </QueryClientProvider>
        </MiscProvider>
      </ScreenProvider>
    </>
  );
}

export default App;
