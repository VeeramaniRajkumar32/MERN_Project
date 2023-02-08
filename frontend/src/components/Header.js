import React from "react";
import { FaUser, FaSignInAlt,FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {logout} from "../features/auth/authSlice"

function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  const onLogout = () => {
    localStorage.getItem('user');
    dispatch(logout());
    navigate('/login')
  }

  return (
    <header className="header">
        <div className="logo">
            <Link to="/">
            <h1>RajVeera</h1>
            </Link>
        </div>
      <ul>
        {
          user ? (
            <li>
                <button className="btn" onClick={onLogout}>
                <FaSignOutAlt />
                  Logout
                </button>
            </li>
          ) : (
            <>
              <li className="register">
                <Link to="/register">
                  <FaUser />
                  Register
                </Link>
              </li>
              <li className="login">
                <Link to="/login">
                  <FaSignInAlt />
                  Login
                </Link>
              </li>
            </>
          )
        }
      </ul>
    </header>
  );
}
export default Header;
