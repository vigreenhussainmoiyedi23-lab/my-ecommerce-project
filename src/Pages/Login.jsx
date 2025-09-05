import React, { useState } from 'react';
import LoginForm from '../components/AuthComponents.jsx/LoginForm';

const Login = ({ setloggedin }) => {
  const [loginState, setLoginState] = useState(true);

  return (
    <div className="bg-gradient-to-tl from-emerald-500 via-teal-500 to-cyan-500 w-full h-screen flex flex-col items-center justify-center">
      <LoginForm
        loginState={loginState}
        setLoginState={setLoginState}
        setloggedin={setloggedin} // ✅ pass correctly
      />
    </div>
  );
};

export default Login;
