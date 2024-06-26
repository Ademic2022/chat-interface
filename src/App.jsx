import React from "react";
import {
  SigninPage,
  SignupPage,
  ResetPassword,
  ResetPasswordConfirm,
  SuccessPage,
  OTPAuth,
  // Dashboard,
  Chats,
} from "./pages";
import PrivateRoutes from "./components/utils/PrivateRoutes";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<SigninPage />} />
        <Route path="/auth/signup/" element={<SignupPage />} />
        <Route path="/auth/reset-password/" element={<ResetPassword />} />
        <Route path="/auth/otp/" element={<OTPAuth />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/chats" element={<Chats />} />
        </Route>
        <Route path="/auth/success/" element={<SuccessPage />} />
        <Route
          path="/auth/reset-password-confirm/"
          element={<ResetPasswordConfirm />}
        />
      </Routes>
    </React.Fragment>
  );
};

export default App;
