import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TubeContext } from '../../Components/Context/TubeContext';
import './Login.css';




function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toggleTheme, handleLogin } = useContext(TubeContext);
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    e.preventDefault();
    const user = { email, password };
    handleLogin(user);
    alert('Login successful!');
    navigate('/');
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleLoginClick}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button type="button" onClick={toggleTheme}>Toggle Theme</button>
      </form>
    </div>
  );
};

export default Login;
