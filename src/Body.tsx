import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/organism/Header';
import { useAuth } from './hooks/useAuth';
import { ActivitiesScreen } from './screens/ActivitiesScreen';
import styled from 'styled-components';
import { LoginScreen } from './screens/LoginScreen';
import { ConfirmationModal } from './components/organism/ConfirmationModal';
import { PlannerScreen } from './screens/PlannerScreen';
import { VilaLoadingScreen } from './components/ui/VilaLoadingScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { ValidateAccountScreen } from './screens/ValidateAccountScreen';
import { VilaSnackbar } from './components/ui/VilaSnackbar';
import { ForgottenPasswordScreen } from './screens/ForgottenPasswordScreen';
import { TemplatesScreen } from './screens/TemplatesScreen';
import { StatsScreen } from './screens/StatsScreen';
import { useMisc } from './hooks/useMisc';
import { CircleLoader, MoonLoader } from 'react-spinners';
import { useEffect, useState } from 'react';


function Body() {

  const authInfo = useAuth()
  const { isLoading } = useMisc()
  const [innerHeight, setInnerHeight] = useState<number | undefined>(undefined)


  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [])


  return (
    <div className='w-full h-full bg-background-900' >
      <BrowserRouter>
        {authInfo.isCompletedLoad === true ?
          <>
            <Routes>
              <Route path="/" element={<PlannerScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/activities" element={<ActivitiesScreen />} />
              <Route path="/templates" element={<TemplatesScreen />} />
              <Route path="/stats" element={<StatsScreen />} />
              <Route path="/validate/:userMail" element={<ValidateAccountScreen />} />
              <Route path="/recover-password" element={<ForgottenPasswordScreen />} />
            </Routes>
          </>
          :
          <VilaLoadingScreen />
        }
        {isLoading && <MoonLoader size={55} color='#5387A5' className='!absolute z-50 right-[50px] bottom-10 ' />}
        <VilaSnackbar />
      </BrowserRouter>
    </div>

  );
}

export default Body;
