import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import validator from "validator";
import authenticate from "../../services/auth";
import AuthService from "../../services/auth-service";
const required = (value) => {
  if (!value) {
    return (
      <div className="text-red-500" role="alert">
        This field is required!
      </div>
    );
  }
};
const email = (value) => {
  if (!validator.isEmail(value)) {
    return (
      <div className="text-red-500" role="alert">
        {value} is not a valid email.
      </div>
    );
  }
};
const minlength = (value) => {
  if (value.length < 4) {
    return (
      <div className="text-red-500" role="alert">
        Password should be min 4 characters.
      </div>
    );
  }
};
const maxlength = (value) => {
  if (value.length > 15) {
    return (
      <div className="text-red-500" role="alert">
        Password should be max 15 characters.
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/appointments");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    if (authenticate() === true) {
      return <Redirect to="/appointments" />;
    }
    return (
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-4xl text-center mb-12 font-thin pt-5">Login</h1>

        <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
          <div className="p-8">
            <Form
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c;
              }}
            >
              {this.state.message && (
                <div className="pb-4">
                  <div
                    className="bg-red-500 text-white p-5 rounded-sm"
                    role="alert"
                  >
                    {this.state.message}
                  </div>
                </div>
              )}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Email
                </label>

                <Input
                  type="text"
                  name="email"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required, email]}
                  className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:bg-gray-100"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Password
                </label>

                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required, maxlength, minlength]}
                  className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:bg-gray-100"
                />
              </div>

              <button className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow">
                Login
              </button>

              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>

          <div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
            <Link to="/register" className="font-medium text-indigo-500">
              Create account
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
