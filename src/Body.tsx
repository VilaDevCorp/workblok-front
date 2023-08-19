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


function Body() {

  const authInfo = useAuth()

  return (
    <div className='w-full min-h-screen bg-background-900' >
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
        <VilaSnackbar />
      </BrowserRouter>
    </div>

  );
}

export default Body;
