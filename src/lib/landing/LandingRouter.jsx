import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from 'src/ui/Navbar/Navbar';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import SyllabusPage from './pages/SyllabusPage/SyllabusPage';
import { Footer } from './components';
import { SignInPage, SignUpPage } from '../auth/pages';
import { AuthContextProvider } from '../auth/authContext';
// import ProtectedRoute from 'src/utils/protectedRoutes';
import TryoutRegistrationPage from './pages/TryoutRegistration/TryoutRegistration';
import TryoutSuccess from './pages/TryoutRegistration/TryoutSuccess';

const LandingRouter = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route index element={<HomePage />} />
          {/* an example of how to use the protected route */}
          {/* <Route path="/team" element={<ProtectedRoute><TeamPage /> </ProtectedRoute>} /> */}
          <Route path="/team" element={<TeamPage />} />
          <Route path="/syllabus" element={<SyllabusPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/tryout" element={<TryoutRegistrationPage />} />
          <Route path="/tryout/success" element={<TryoutSuccess />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
};


export default LandingRouter;
