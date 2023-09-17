import Body from './Body';
import { ApiProvider } from './hooks/useApi';
import { AuthProvider } from './hooks/useAuth';
import { MiscProvider } from './hooks/useMisc';
import { ScreenProvider } from './hooks/useScreen';
import { SnackbarProvider } from './hooks/useSnackbar';
import '../src/index.css'; // replace with the name of your tailwind css file
import { ApiErrorProvider } from './hooks/useApiError';
import { DescriptionDialog } from './components/atom/DescriptionDialog';
import { DescriptionDialogProvider } from './hooks/useDescriptionDialog';


function App() {
  return (<>
    <ScreenProvider>
      <MiscProvider>
        <SnackbarProvider>
          <DescriptionDialogProvider>
            <AuthProvider>
              <ApiErrorProvider>
                <ApiProvider>
                  <Body />
                </ApiProvider>
              </ApiErrorProvider>
            </AuthProvider>
          </DescriptionDialogProvider>
        </SnackbarProvider>
      </MiscProvider>
    </ScreenProvider>
  </>
  );
}

export default App;
