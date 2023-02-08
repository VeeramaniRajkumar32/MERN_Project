import React from "react";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, register } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const { name, userName, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if(isError){
      toast.error(message);
    }

    if(isSuccess && user){
      navigate('/')
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message,navigate,dispatch]);

  if(isLoading) {
    <Spinner/>
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password is not matching");
    } else {
      const userData = {
        name,
        userName,
        password,
      };
      dispatch(register(userData));
    }
  };

  return (
    <>
      <section className="heading">
        <h3>
          <FaUser /> Register
        </h3>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter the name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label className="form">Username</label>
            <input
              type="email"
              name="userName"
              value={userName}
              placeholder="Enter the email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label className="form">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter the password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label className="form">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Enter the confirm password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
