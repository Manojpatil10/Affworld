import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import axios from "axios";

export default function Topbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isArrow, setIsArrow] = useState(true);
  const username = localStorage.getItem('username')
  const userToken = localStorage.getItem('jwt');
  const navigate = useNavigate();

  console.log(userToken)
  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.setItem("jwt", "");
      navigate("/");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsArrow(!isArrow);
  };

  useEffect(() => {
    if (userToken !== null) {
      console.log('hello')
      console.log(userToken)
      axios
        .post("http://localhost:8080/getUser", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((success) => {
          console.log('username', success)
        })
        .catch((error) => {
          console.error("Error fetching username:", error);
        });
    }
  }, [userToken]);

  return (
    <header>
      <nav className={styles.nav}>
        <div className="container">
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <Link to="/" className={styles.logo}>
                Task Management
              </Link>
            </div>
            <div className={styles.topCenter}>
              <ul className={styles.topList}>
                <li className={styles.topListItem}>
                  <Link className={styles.link} to="/">
                    Feed
                  </Link>
                </li>
                <li className={styles.topListItem}>
                  <Link className={styles.link} to="/addTask">
                    +Task
                  </Link>
                </li>
                <li className={styles.topListItem}>
                  <Link className={styles.link} to="/mytask">
                    My Task
                  </Link>
                </li>
                <li className={styles.topListItem}>
                  <Link className={styles.link} to="/addPost">
                    +Post
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.topRight}>
              {userToken !== '' ? (
                <div className={styles.userMenu}>
                  <span className={styles.userName} onClick={toggleDropdown}>
                    {username}{" "}
                    {isArrow ? (
                      <i className="fa-solid fa-chevron-down ms-1"></i>
                    ) : (
                      <i className="fa-solid fa-chevron-up ms-1"></i>
                    )}
                  </span>
                  {isDropdownOpen && (
                    <ul className={styles.dropdown}>
                      <li onClick={logout}>
                        <span className={styles.dropdownLink} >
                          <i className="fa-solid fa-sign-out-alt me-1"></i> LOGOUT
                        </span>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <ul className={`${styles.topList}`}>
                  <li className={styles.topListItem}>
                    <Link className={styles.link} to="/login">
                      LOGIN
                    </Link>
                  </li>
                  <li className={styles.separator}>|</li>
                  <li className={styles.topListItem}>
                    <Link className={styles.link} to="/signup">
                      REGISTER
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
