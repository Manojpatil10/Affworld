import React, { useState } from 'react';
import { IoIosLock } from 'react-icons/io';
import style from './UpdatePass.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar'

function UpdatePass() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    setPasswordError(!passwordRegex.test(newPassword) || newPassword !== confirmPassword);

    if (passwordRegex.test(newPassword) && newPassword === confirmPassword) {
      console.log('valid passwords');
      axios
        .post('http://localhost:8080/updatePass', { newPassword })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className={style.login_page}>
          <form className={style.login_form} onSubmit={handleSubmit}>
            <h2 className={style.login_heading}>Update Password</h2>

            <div className={style.input_group}>
              <input
                type="password"
                value={newPassword}
                className={style.input_field}
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span className={style.input_icon}>
                <IoIosLock />
              </span>
            </div>

            <div className={style.input_group}>
              <input
                type="password"
                value={confirmPassword}
                className={style.input_field}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className={style.input_icon}>
                <IoIosLock />
              </span>
            </div>

            {passwordError && <p className={style.error}>Passwords do not match or are invalid</p>}

            <button type="submit" className={style.btn}>
              Update Password
            </button>

            <div className={style.extra_links}>
              <p className={style.swipe}>
                Remembered your password? <Link to={'/login'} className={style.login}>Log In</Link>
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default UpdatePass;
