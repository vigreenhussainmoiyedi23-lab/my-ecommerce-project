import React, { useContext, useState } from 'react';
import { LogContext } from '../../Context/AuthContext';

const LoginForm = ({ loginState, setLoginState, setloggedin }) => {
  const { users, setUsers, setCurrentUser } = useContext(LogContext);
  const [LogInDets, setLogInDets] = useState({ email: '', password: '' });

  const Submithandler = (e) => {
    e.preventDefault();

    if (loginState) {
      // 🔑 Sign in
      const found = users.find(
        (u) => u.email === LogInDets.email && u.password === LogInDets.password
      );
      if (found) {
        setCurrentUser(found);
        localStorage.setItem('CurrentUser', JSON.stringify(found));
        localStorage.setItem('LoggedIn', JSON.stringify(true));
        setloggedin(true); // ✅ update App state
      } else {
        alert('Incorrect Credentials 🔒');
      }
    } else {
      // 📝 Sign up
      if (users.find((u) => u.email === LogInDets.email)) {
        alert('A user is already registered with this email');
        return;
      }

      const newUser = {
        ...LogInDets,
        CartItems: [],
        CheckedOutProducts: [],
        DeliveredProducts: [],
      };

      setUsers([...users, newUser]);
      setCurrentUser(newUser);

      localStorage.setItem('CurrentUser', JSON.stringify(newUser));
      localStorage.setItem('Users', JSON.stringify([...users, newUser]));
      localStorage.setItem('LoggedIn', JSON.stringify(true));

      setloggedin(true); // ✅ directly log them in
      alert('Signed up successfully! 🔐🔑');
    }

    setLogInDets({ email: '', password: '' });
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold text-gray-100">
        {loginState ? 'Sign In' : 'Sign Up'}
      </h1>

      <form onSubmit={Submithandler} className="flex flex-col items-center">
        <input
          type="email"
          required
          placeholder="Email"
          value={LogInDets.email}
          onChange={(e) =>
            setLogInDets({ ...LogInDets, email: e.target.value })
          }
          className="bg-[#05966853] border-2 border-emerald-900 text-gray-200 py-2 px-4 rounded-full mt-2 mb-2"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={LogInDets.password}
          onChange={(e) =>
            setLogInDets({ ...LogInDets, password: e.target.value })
          }
          className="bg-[#05966853] border-2 border-emerald-900 text-gray-200 py-2 px-4 rounded-full mt-2 mb-2"
        />
        <button
          type="submit"
          className="rounded-full bg-stone-500 text-white font-bold text-xl py-2 px-4"
        >
          {loginState ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <button
        onClick={() => setLoginState((prev) => !prev)}
        className="underline text-cyan-300 mt-2"
      >
        {loginState
          ? "Don't have an account? Sign up"
          : 'Have an account? Sign in'}
      </button>
    </>
  );
};

export default LoginForm;
