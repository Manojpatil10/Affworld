import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosLock } from 'react-icons/io';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import style from './Signup.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate()

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    const newError = {
      username: username ? '' : 'Username is required',
      email: emailRegex.test(email) ? '' : 'Invalid email address',
      password: passwordRegex.test(password)
        ? ''
        : 'Password must contain at least 8 characters, one uppercase letter, one number, and one special character',
    };

    setError(newError);
    return !newError.username && !newError.email && !newError.password;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axios
      .post('http://localhost:8080/signup', { username, email, password })
      .then((result) => {
        alert('Registration completed successfully!');
        setUsername('');
        setEmail('');
        setPassword('');
        setError({ username: '', email: '', password: '' });
        navigate('/login')
      })
      .catch((err) => {
        alert('Registration failed. Please check your details and try again.');
        console.error(err);
      });
  };

  return (
    <>
      <Navbar />
      <main>
        <div className={style.login_page}>
          <form className={style.login_form} onSubmit={handleSignup}>
            <h2 className={style.login_heading}>Register</h2>

            <div className={style.input_group}>
              <span className={style.input_icon}>
                <FaUserCircle />
              </span>
              <input
                type="text"
                value={username}
                className={style.input_field}
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {error.username && <p className={style.error}>{error.username}</p>}

            <div className={style.input_group}>
              <span className={style.input_icon}>
                <FaUserCircle />
              </span>
              <input
                type="text"
                value={email}
                className={style.input_field}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error.email && <p className={style.error}>{error.email}</p>}

            <div className={style.input_group}>
              <span className={style.input_icon}>
                <IoIosLock />
              </span>
              <input
                value={password}
                type={showPass ? 'text' : 'password'}
                className={style.input_field}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className={style.eye_icon}
                onMouseDown={() => setShowPass(true)}
                onMouseUp={() => setShowPass(false)}
              >
                {showPass ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
            {error.password && <p className={style.error}>{error.password}</p>}

            <button type="submit" className={style.btn}>
              Register
            </button>

            <div className={style.extra_links}>
              <p className={style.swipe}>
                Already have an account? <Link to={'/login'} className={style.register}>Log In</Link>
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Signup;
