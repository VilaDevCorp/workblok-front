import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/organism/Header';
import { useAuth } from './hooks/useAuth';
import { Activities } from './screens/Activities';
import styled from 'styled-components';
import { LoginScreen } from './screens/LoginScreen';
import { CoolModal } from './components/organism/CoolModal';
import { ConfirmationModal } from './components/organism/ConfirmationModal';
import { CoolSnackbar } from './components/atom/CoolSnackbar';
import { Planning } from './screens/Planning';
import { CoolLoading } from './components/atom/CoolLoading';
import { CoolLoadingScreen } from './components/organism/CoolLoadingScreen';
import { RegisterScreen } from './screens/RegisterScreen';


const MainBox = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.color.background.n};
  `;


function Body() {

  const authInfo = useAuth()


  return (
    <MainBox>
      <BrowserRouter>
        {authInfo.isCompletedLoad === true ?
          <>
            <Header />
            <Routes>
            <Route path="/" element={<Planning />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/activities" element={<Activities />} />
            </Routes>
            <CoolLoading />
            <CoolModal/>
            <ConfirmationModal/>
            <CoolSnackbar/>
          </>
          :
          <CoolLoadingScreen />
        }
        <LoginScreen />


      </BrowserRouter>
    </MainBox>

  );
}

export default Body;
