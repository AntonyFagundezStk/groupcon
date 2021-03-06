import React, { useState } from "react";
import { setToken } from "../Helpers/auth-helper";
import LoginForm from "../components/LoginForm/LoginForm";
import Axios from "axios";
import Alert from "../components/Alert";
const Login = ({ location }) => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [getError, setError] = useState({
    error: ""
  });
  const [loading, setLoading] = useState(false);
  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError({ error: "" });
    setLoading(true);
    await LogIn();
  };

  const LogIn = async () => {
    try {
      let response = await Axios.post(`/api/v1/auth/login`, formValues);

      if (response.status === 200) {
        setToken(response.data.token);

        window.location = location.state
          ? location.state.urlRedirectAfterLogin
          : "/dashboard";
      } else {
        setFormValues({ ...formValues, password: "" });
        let messageFormatted = response.data.error.split('"').join(" ");

        setError({ error: messageFormatted });

        setLoading(false);
      }
    } catch (error) {
      setFormValues({ ...formValues, password: "" });
      setError({
        error: error.response.data.error
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-8 ml-auto mr-auto mt-2">
          <Alert message={getError.error} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-8 ml-auto mr-auto mt-2">
          <LoginForm
            loading={loading}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
