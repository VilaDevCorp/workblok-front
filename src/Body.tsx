import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LoginScreen } from './screens/LoginScreen';
import { PlannerScreen } from './screens/PlannerScreen';
import { VilaLoadingScreen } from './components/ui/VilaLoadingScreen';
import { VilaSnackbar } from './components/ui/VilaSnackbar';
import { useMisc } from './hooks/useMisc';
import { PuffLoader } from 'react-spinners';
import { Suspense, lazy, useEffect, useState } from 'react';

const LazyActivitiesScreen = lazy(() => import('./screens/ActivitiesScreen').then((module) => ({ default: module.ActivitiesScreen })))
const LazyRegisterScreen = lazy(() => import('./screens/RegisterScreen').then((module) => ({ default: module.RegisterScreen })));
const LazyValidateAccountScreen = lazy(() => import('./screens/ValidateAccountScreen').then((module) => ({ default: module.ValidateAccountScreen })));
const LazyForgottenPasswordScreen = lazy(() => import('./screens/ForgottenPasswordScreen').then((module) => ({ default: module.ForgottenPasswordScreen })));
const LazyTemplatesScreen = lazy(() => import('./screens/TemplatesScreen').then((module) => ({ default: module.TemplatesScreen })));
const LazyStatsScreen = lazy(() => import('./screens/StatsScreen').then((module) => ({ default: module.StatsScreen })));

function Body() {

  const authInfo = useAuth()
  const { isLoading } = useMisc()
  const [innerHeight, setInnerHeight] = useState<number | undefined>(undefined)


  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [])


  return (
    <div className='w-full h-full md:h-screen bg-background-900' >
      <BrowserRouter>
        {authInfo.isCompletedLoad === true ?
          <Suspense fallback={<VilaLoadingScreen />}>
            <Routes>
              <Route path="/" element={<PlannerScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<LazyRegisterScreen />} />
              <Route path="/activities" element={<LazyActivitiesScreen />} />
              <Route path="/templates" element={<LazyTemplatesScreen />} />
              <Route path="/stats" element={<LazyStatsScreen />} />
              <Route path="/validate/:userMail" element={<LazyValidateAccountScreen />} />
              <Route path="/recover-password" element={<LazyForgottenPasswordScreen />} />
            </Routes>
          </Suspense>
          :
          <VilaLoadingScreen />
        }
        {isLoading && <PuffLoader size={55} color='#5387A5' className='!absolute z-50 right-[50px] bottom-10 ' />}
        <VilaSnackbar />
      </BrowserRouter>
    </div>

  );
}

export default Body;
