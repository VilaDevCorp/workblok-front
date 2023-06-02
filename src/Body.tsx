import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/organism/Header';
import { useAuth } from './hooks/useAuth';
import { ActivitiesScreen } from './screens/ActivitiesScreen';
import styled from 'styled-components';
import { LoginScreen } from './screens/LoginScreen';
import { ConfirmationModal } from './components/organism/ConfirmationModal';
import { PlannerScreen } from './screens/PlannerScreen';
import { VilaLoadingScreen } from './components/ui/VilaLoadingScreen';
import { RegisterScreen } from './screens/RegisterScreen';


function Body() {

  const authInfo = useAuth()

  return (
    <div className='w-full h-full bg-background-900' >
      <BrowserRouter>
        {authInfo.isCompletedLoad === true ?
          <>
            <Header />
            <Routes>
            <Route path="/" element={<PlannerScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/activities" element={<ActivitiesScreen />} />
            </Routes>
          </>
          :
          <VilaLoadingScreen />
        }
        <LoginScreen />
      </BrowserRouter>
    </div>

  );
}

export default Body;
