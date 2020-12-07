import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import AppointmentService from "../../services/appointment-service";
import locations from "../../services/location.json";
const required = (value) => {
  if (!value) {
    return (
      <div className="text-red-500" role="alert">
        This field is required!
      </div>
    );
  }
};
class Appointments extends Component {
  constructor(props) {
    super(props);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      location: "",
      date: "",
      time: "",
      message: "",
    };
  }
  onChangeLocation(e) {
    this.setState({
      location: e.target.value,
    });
  }
  onChangeDate(e) {
    this.setState({
      date: e.target.value,
    });
  }
  onChangeTime(e) {
    this.setState({
      time: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
    });
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AppointmentService.addNew(
        this.state.location,
        this.state.date,
        this.state.time
      ).then(
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
            message: resMessage,
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="max-w-2xl w-full mx-auto">
        <h1 className="text-4xl text-center mb-2 font-thin pt-5">
          Add new appointment
        </h1>
        <Link
          to="/appointments"
          className="block w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow text-center"
        >
          Back
        </Link>
        <div className="mt-5">
          <Form
            onSubmit={this.handleSubmit}
            ref={(c) => {
              this.form = c;
            }}
          >
            {this.state.message && (
              <div className="pb-3">
                <div className="bg-red-500 text-white p-5" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <div className="mb-5">
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Location
              </label>
              <Select
                name="location"
                value={this.state.location}
                onChange={this.onChangeLocation}
                validations={[required]}
                className="  w-full p-3  rounded bg-gray-200 border border-transparent focus:outline-none focus:bg-gray-100"
              >
                <option value="">Choose your city</option>
                {locations.map((val, key) => {
                  return (
                    <option value={val.name} key={key}>
                      {val.name}
                    </option>
                  );
                })}
              </Select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Date
              </label>

              <Input
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.onChangeDate}
                validations={[required]}
                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:bg-gray-100"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="time"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Time
              </label>

              <Input
                type="time"
                name="time"
                value={this.state.time}
                onChange={this.onChangeTime}
                validations={[required]}
                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:bg-gray-100"
              />
            </div>

            <button className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow">
              Submit
            </button>

            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
export default withRouter(Appointments);
