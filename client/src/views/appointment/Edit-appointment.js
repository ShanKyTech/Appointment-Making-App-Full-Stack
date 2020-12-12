import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import Textarea from "react-validation/build/textarea";
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
    this.handleBlur = this.handleBlur.bind(this);
    this.onChangeDetails = this.onChangeDetails.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      id: "",
      location: "",
      date: new Date(),
      time: "",
      details: "",
      message: "",
      dateError: false,
    };
  }
  onChangeLocation(e) {
    this.setState({
      location: e.target.value,
    });
  }
  onChangeDate(e) {
    this.setState({
      date: e,
    });
    if (e) {
      this.setState({
        dateError: false,
      });
    }
  }
  onChangeTime(e) {
    this.setState({
      time: e.target.value,
    });
  }
  onChangeDetails(e) {
    this.setState({
      details: e.target.value,
    });
  }
  handleBlur(e) {
    if (e.target.value === "") {
      this.setState({
        dateError: true,
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
    });
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0 && !this.state.dateError) {
      AppointmentService.update(
        this.state.location,
        this.state.date,
        this.state.time,
        this.state.details,
        this.state.id
      ).then(
        () => {
          toast("Appointment Updated Successfully!");
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
  componentDidMount() {
    AppointmentService.view(this.props.match.params.id).then((res) => {
      this.setState({
        location: res.data.location,
        date: new Date(res.data.date),
        time: res.data.time,
        id: res.data.id,
      });
    });
  }
  render() {
    return (
      <div className="max-w-2xl w-full mx-auto">
        <h1 className="text-4xl text-center mb-2 font-thin pt-5">
          Update Appointment
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
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
                onBlur={this.handleBlur}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="Select Date"
                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:bg-gray-100"
              />
              {this.state.dateError && (
                <div className="text-red-500">This field is required!</div>
              )}
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
            <div className="mb-5">
              <label
                htmlFor="time"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Message
              </label>

              <Textarea
                value={this.state.details}
                onChange={this.onChangeDetails}
                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:bg-gray-100"
              />
            </div>
            <button className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow">
              Update
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
