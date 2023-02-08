import React from "react";
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, login } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
	userName: "",
	password: "",
  });
  const { userName, password} = formData;

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
	}))
  };
  const onSubmit = (e) =>{
	e.preventDefault();

	const userData = {
        userName,
        password,
      };
      dispatch(login(userData));
  }
  
  if(isLoading) {
    <Spinner/>
  }

  return (
	<>
	  <section className="heading">
		<h3>
		  <FaSignInAlt /> Login
		</h3>
		<p>Please login your account</p>
	  </section>
	  <section className="form">
		<form onSubmit={onSubmit}>
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
			  <button button type='submit' className="btn btn-block">Submit</button>
		  </div>
		</form>
	  </section>
	</>
  );
}

export default Login;
