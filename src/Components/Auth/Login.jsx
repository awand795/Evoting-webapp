import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../Services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {

  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/dashboard");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-5">
                  <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                    <div class="card-body">
                      <Form onSubmit={handleLogin} ref={form}>
                        <div class="form-floating mb-3">
                          <Input class="form-control" type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                          />
                          <label for="username">username</label>
                        </div>
                        <div class="form-floating mb-3">
                          <Input class="form-control" id="inputPassword" type="password"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                          />
                          <label for="inputPassword">Password</label>
                        </div>
                        <div class="form-check mb-3">
                          <input class="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                          <label class="form-check-label" for="inputRememberPassword">Remember Password</label>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <a class="small" href="password.html">Forgot Password?</a>
                          {message && (
                            <div className="form-group">
                              <div className="alert alert-danger" role="alert">
                                {message}
                              </div>
                            </div>
                          )}
                          <button class="btn btn-primary" href="index.html">{loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                            <span>Login</span></button>
                          <CheckButton style={{ display: "none" }} ref={checkBtn} />

                        </div>
                      </Form>
                    </div>
                    <div class="card-footer text-center py-3">
                      <div class="small"><a href="register.html">Need an account? Sign up!</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutAuthentication_footer">
          <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid px-4">
              <div class="d-flex align-items-center justify-content-between small">
                <div class="text-muted">Copyright &copy; Your Website 2022</div>
                <div>
                  <a href="/">Privacy Policy</a>
                  &middot;
                  <a href="/">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Login