import Body from './Body';
import { CoolLoading } from './components/atom/CoolLoading';
import GlobalStyle from './globalStyles';
import { ApiProvider } from './hooks/useApi';
import { AuthProvider } from './hooks/useAuth';
import { MiscProvider } from './hooks/useMisc';
import { ModalProvider } from './hooks/useModal';
import { ScreenProvider } from './hooks/useScreen';
import { SnackbarProvider } from './hooks/useSnackbar';
import { StyledTheme } from './StyledTheme';


function App() {
  return (<>
    <ScreenProvider>
      <MiscProvider>
        <SnackbarProvider>
          <AuthProvider>
            <ApiProvider>
              <ModalProvider>
                <StyledTheme>
                  <GlobalStyle />
                  <CoolLoading />
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
