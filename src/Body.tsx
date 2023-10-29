import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LoginScreen } from './screens/LoginScreen';
import { useMisc } from './hooks/useMisc';
import { Suspense, lazy, useEffect, useState } from 'react';
import { RegisterScreen } from './screens/RegisterScreen';
import { PageLoadingScreen } from './screens/PageLoadingScreen';
import { ValidateAccountScreen } from './screens/ValidateAccountScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ResetPasswordScreen } from './screens/ResetPasswordScreen';

const LazyRegisterScreen = lazy(() => import('./screens/RegisterScreen').then((module) => ({ default: module.RegisterScreen })));
const LazyForgottenPasswordScreen = lazy(() => import('./screens/ForgottenPasswordScreen').then((module) => ({ default: module.ForgottenPasswordScreen })));

function Body() {

  const authInfo = useAuth()
  const { isLoading } = useMisc()


  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [])


  return (
    <div
      className='w-full h-full relative ' >
      <BrowserRouter>
        {authInfo.isLoadingUserInfo === false ?
          <>
            <Suspense fallback={<PageLoadingScreen />}>
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<Suspense fallback={<PageLoadingScreen isPublic />}><LazyRegisterScreen /></Suspense>} />
                <Route path="/validate/:userMail/:code" element={<ValidateAccountScreen />} />
                <Route path="/reset-password/:userMail/:code" element={<ResetPasswordScreen />} />
                <Route path="/recover-password" element={<Suspense fallback={<PageLoadingScreen isPublic />}><LazyForgottenPasswordScreen /></Suspense>} />
              </Routes>
            </Suspense>
          </>
          :
          <PageLoadingScreen isPublic />
        }
      </BrowserRouter>
    </div >

  );
}

export default Body;
