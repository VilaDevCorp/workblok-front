import Body from './Body';
import { ApiProvider } from './hooks/useApi';
import { AuthProvider } from './hooks/useAuth';
import { MiscProvider } from './hooks/useMisc';
import { ModalProvider } from './hooks/useModal';
import { ScreenProvider } from './hooks/useScreen';
import { SnackbarProvider } from './hooks/useSnackbar';
import { StyledTheme } from './StyledTheme';
import '../src/index.css'; // replace with the name of your tailwind css file


function App() {
  return (<>
    <ScreenProvider>
      <MiscProvider>
        <SnackbarProvider>
          <AuthProvider>
            <ApiProvider>
              <ModalProvider>
                <StyledTheme>
                  <Body />
                </StyledTheme>
              </ModalProvider>
            </ApiProvider>
          </AuthProvider>
        </SnackbarProvider>
      </MiscProvider>
    </ScreenProvider>
  </>
  );
}

export default App;
