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
    return <div className="text-red-600">This field is required!</div>;
  }
};
const password = (value, props, components) => {
  if (value !== components["password"][0].value) {
    return <span className="text-red-600">Passwords are not equal.</span>;
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
const addressMinlength = (value) => {
  if (value.length < 5) {
    return (
      <div className="text-red-500" role="alert">
        must be more than 5 characters
      </div>
    );
  }
};
const phoneLength = (value) => {
  if (value.length != 10) {
    return (
      <div className="text-red-500" role="alert">
        must be exactly 10 integers.
      </div>
    );
  }
};
const IntegerValidation = (value) => {
  let regx = /^([+-]?[0-9]\d*|0)$/;
  if (!regx.test(value)) {
    return (
      <div className="text-red-500" role="alert">
        Must be integer.
      </div>
    );
  }
};
const dateValidation = (value) => {
  let regx = /^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/;
  if (!regx.test(value)) {
    return (
      <div className="text-red-500" role="alert">
        Must be date type
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCPassword = this.onChangeCPassword.bind(this);

    this.state = {
      first_name: "",
      last_name: "",
      phone: "",
      dob: "",
      address: "",
      email: "",
      password: "",
      c_password: "",
      successful: false,
      message: "",
    };
  }

  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value,
    });
  }
  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value,
    });
  }
  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }
  onChangeDob(e) {
    this.setState({
      dob: e.target.value,
    });
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeCPassword(e) {
    this.setState({
      c_password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.first_name,
        this.state.last_name,
        this.state.phone,
        this.state.address,
        this.state.dob,
        this.state.email,
        this.state.password
      ).then(
        (response) => {
          let path = `/`;
          this.props.history.push(path);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }
  render() {
    if (authenticate() === true) {
      return <Redirect to="/appointments" />;
    }
    return (
      <div>
        <div className="max-w-2xl w-full mx-auto">
          <h1 className="text-4xl text-center mb-12 font-thin pt-5">
            Register
          </h1>

          <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            <div className="p-8">
              <Form
                onSubmit={this.handleRegister}
                ref={(c) => {
                  this.form = c;
                }}
              >
                {this.state.message && (
                  <div className="pb-5">
                    <div
                      className={
                        this.state.successful
                          ? "bg-green-500 text-white p-5"
                          : "bg-red-500 text-white p-5"
                      }
                      role="alert"
                    >
                      {this.state.message}
                    </div>
                  </div>
                )}
                {!this.state.successful && (
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="mb-5">
                        <label
                          htmlFor="first_name"
                          className="block mb-2 text-sm font-medium text-gray-600"
                        >
                          First Name
                        </label>

                        <Input
                          type="text"
                          name="first_name"
                          id="first_name"
                          validations={[required]}
                          value={this.state.first_name}
                          onChange={this.onChangeFirstName}
                          className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:bg-gray-100"
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          htmlFor="last_name"
                          className="block mb-2 text-sm font-medium text-gray-600"
                        >
                          Last Name
                        </label>

                        <Input
                          type="text"
                          name="last_name"
                          id="last_name"
                          validations={[required]}
                          value={this.state.last_name}
                          onChange={this.onChangeLastName}
                          className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:bg-gray-100"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="mb-5">
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-sm font-medium text-gray-600"
                        >
                          Phone no.
                        </label>

                        <Input
                          type="phone"
                          name="phone"
                          id="phone"
                          validations={[
                            required,
                            IntegerValidation,
                            phoneLength,
                          ]}
                          value={this.state.phone}
                          onChange={this.onChangePhone}
                          className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:bg-gray-100"
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          htmlFor="dob"
                          className="block mb-2 text-sm font-medium text-gray-600"
                        >
                          DOB
                        </label>

                        <Input
                          type="text"
                          name="dob"
                          id="dob"
                          validations={[required, dateValidation]}
                          value={this.state.dob}
                          onChange={this.onChangeDob}
                          className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:bg-gray-100"
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-gray-600"
                      >
                        Address
                      </label>

                      <Input
                        type="text"
                        name="address"
                        id="address"
                        value={this.state.address}
                        onChange={this.onChangeAddress}
                        validations={[addressMinlength, required]}
                        className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:bg-gray-100"
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-600"
                      >
                        Email
                      </label>

                      <Input
                        type="email"
                        name="email"
                        validations={[required, email]}
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:bg-gray-100"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                          validations={[required, minlength, maxlength]}
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:bg-gray-100"
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          htmlFor="c_password"
                          className="block mb-2 text-sm font-medium text-gray-600"
                        >
                          Confirm Password
                        </label>

                        <Input
                          type="password"
                          name="c_password"
                          validations={[required, password]}
                          value={this.state.c_password}
                          onChange={this.onChangeCPassword}
                          className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:bg-gray-100"
                        />
                      </div>
                    </div>

                    <button className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow">
                      Sign up
                    </button>
                  </div>
                )}

                <CheckButton
                  style={{ display: "none" }}
                  ref={(c) => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
            </div>

            <div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
              <Link to="/" className="font-medium text-indigo-500">
                I already have an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Register);
