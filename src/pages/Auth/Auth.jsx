import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const navigate = useNavigate()
  const auth = getAuth();

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Google:', result.user);
      navigate('/cart')
    } catch (error) {
      console.error('Error during Google login:', error.message);
    }
  };

  // Function to handle login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
    } catch (error) {
      console.error('Login Error:', error.message);
    }
  };

  // Function to handle registration with email and password
  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
    } catch (error) {
      console.error('Registration Error:', error.message);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => setActiveTab('register')}
              >
                Register
              </button>
            </li>
          </ul>
          <div className="tab-content">
            {activeTab === 'login' && (
              <div className="tab-pane active">
                <h3 className="text-center mt-3">Login</h3>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="loginEmail" name="email" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="loginPassword" name="password" required />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <div className="text-center mt-3">
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={handleGoogleLogin}
                  >
                    <i className="bi bi-google"></i> Login with Google
                  </button>
                </div>
              </div>
            )}
            {activeTab === 'register' && (
              <div className="tab-pane active">
                <h3 className="text-center mt-3">Register</h3>
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="registerEmail" name="email" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="registerPassword" name="password" required />
                  </div>
                  <button type="submit" className="btn btn-success w-100">Register</button>
                </form>
                <div className="text-center mt-3">
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={handleGoogleLogin}
                  >
                    <i className="bi bi-google"></i> Register with Google
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
