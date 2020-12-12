import moment from "moment";
import queryString from "query-string";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import ImageUpload from "../../components/ImageUpload";
import Appointment from "../../services/appointment-service";
class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      showing: false,
      user: {},
    };
    this.handleActive = this.handleActive.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onClickVisible = this.onClickVisible.bind(this);
    this.viewAll = this.viewAll.bind(this);
    this.viewActive = this.viewActive.bind(this);
    this.viewInactive = this.viewInactive.bind(this);
    this.viewCalcelled = this.viewCalcelled.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleActive(id) {
    Appointment.active(id).then((res) => {
      if (res.status === 200) {
        this.getAppointment();
        toast("Appointment Activated Successfully!");
      }
    });
  }
  handleCancel(id) {
    Appointment.cancel(id).then((res) => {
      if (res.status === 200) {
        this.getAppointment();
        toast("Appointment Cancelled Successfully!");
      }
    });
  }
  handleDelete(id) {
    Appointment.delete(id).then((res) => {
      if (res.status === 200) {
        toast(res.data.message);
        this.setState({
          appointments: this.state.appointments.filter(function (data) {
            return data.id !== id;
          }),
        });
      }
    });
  }
  async viewAll() {
    await this.props.history.push(`/appointments?status=view-all`);
    this.getAppointment();
  }
  async viewActive() {
    await this.props.history.push(`/appointments?status=active`);
    this.getAppointment();
  }
  async viewInactive() {
    await this.props.history.push(`/appointments?status=Inactive`);
    this.getAppointment();
  }
  async viewCalcelled() {
    await this.props.history.push(`/appointments?status=cancel`);
    this.getAppointment();
  }
  getAppointment() {
    let params = queryString.parse(this.props.location.search);
    Appointment.getallappointments(params.status).then((res) => {
      let datas = [];
      res.data.forEach((element) => {
        datas.push({ ...element, visible: false });
      });
      if (datas.length === 0) {
        this.setState({
          showing: true,
        });
      } else {
        this.setState({
          showing: false,
        });
      }
      this.setState({
        appointments: datas,
      });
    });
  }
  componentDidMount() {
    this.getAppointment();
    this.setState({ user: JSON.parse(localStorage.getItem("user")) });
  }
  onClickVisible(id) {
    var data = this.state.appointments.map((item) => {
      if (item.id === id) {
        item.visible = !item.visible;
      }
      return item;
    });
    this.setState({
      appointments: data,
    });
  }
  render() {
    return (
      <div className="container mx-auto">
        <h1 className="text-4xl text-center mb-2 font-thin pt-5 pb-6">
          Appointments
        </h1>
        <div className="lg:flex">
          <div className="w-full lg:w-3/12 xl:w-4/12 pb-5 lg:pb-0">
            <ImageUpload user={this.state.user} />
          </div>
          <div className="w-full lg:w-8/12 xl:w-8/12">
            <div className="w-full bg-white shadow-lg p-5 rounded-md">
              <div className="md:flex justify-between">
                <Link
                  to="/appointment/add-new"
                  className="mb-3 md:mb-0 w-full md:w-auto inline-block bg-indigo-500 text-sm lg:text-base px-3 lg:px-6 xl:px-10 py-3 rounded-sm focus:outline-none hover:bg-indigo-700 md:mx-2 text-white"
                >
                  Add Appointment
                </Link>
                <div className="flex items-center">
                  <button
                    onClick={this.viewAll}
                    className="w-full md:w-auto inline-block bg-purple-600 text-sm lg:text-base px-2 lg:px-4 xl:px-5 py-3 rounded-sm focus:outline-none hover:bg-purple-800 md:mx-2 mr-2 text-white"
                  >
                    View all
                  </button>
                  <button
                    onClick={this.viewActive}
                    className="w-full md:w-auto inline-block bg-blue-500 text-sm lg:text-base px-2 lg:px-4 xl:px-5 py-3 rounded-sm focus:outline-none hover:bg-blue-700 md:mx-2 mr-2 text-white"
                  >
                    Active
                  </button>
                  <button
                    onClick={this.viewInactive}
                    className="w-full md:w-auto inline-block bg-blue-500 text-sm lg:text-base px-2 lg:px-4 xl:px-5 py-3 rounded-sm focus:outline-none hover:bg-blue-700 md:mx-2 mr-2 text-white"
                  >
                    Inactive
                  </button>
                  <button
                    onClick={this.viewCalcelled}
                    className="w-full md:w-auto inline-block bg-red-500 text-sm lg:text-base px-2 lg:px-4 xl:px-5 py-3 rounded-sm focus:outline-none hover:bg-red-700 md:mx-2  text-white"
                  >
                    Cancelled
                  </button>
                </div>
              </div>
              {!this.state.showing && (
                <div className="mt-5">
                  {this.state.appointments.map((val, key) => {
                    return (
                      <div
                        key={key}
                        className="p-5 flex bg-white shadow border-t border-gray-100 mb-5"
                      >
                        <div className="w-full">
                          <p className="capitalize text-xl font-bold px-3 py-1 rounded bg-green-200 inline-block ">
                            {val.appointment_status.status === "Inactive"
                              ? "Inactive"
                              : ""}
                            {val.appointment_status.status === "cancel"
                              ? "Cancelled"
                              : ""}
                            {val.appointment_status.status === "active"
                              ? "Active"
                              : ""}
                          </p>

                          <div className="w-full md:flex">
                            <div className="md:w-6/12">
                              <p className="py-1">
                                Name:&nbsp;
                                <strong>
                                  {val.user.first_name +
                                    " " +
                                    val.user.last_name}
                                </strong>
                              </p>
                              <p className="py-1">
                                Email: &nbsp;{" "}
                                <strong> {val.user.email} </strong>
                              </p>
                              <p className="py-1">
                                DOB: &nbsp; <strong> {val.user.dob} </strong>
                              </p>
                              <p className="py-1">
                                Message: &nbsp;
                                <strong>
                                  {val.details && val.details.length > 30
                                    ? val.details.substring(0, 30) + "..."
                                    : val.details}
                                </strong>
                              </p>
                            </div>
                            <div className="md:w-5/12">
                              <p className="py-1">
                                Location:&nbsp; <strong> {val.location}</strong>
                              </p>
                              <p className="py-1">
                                Date:&nbsp;
                                <strong>
                                  {moment(val.date).format("DD/MM/YYYY")}
                                </strong>
                              </p>
                              <p className="py-1">
                                Time:&nbsp; <strong> {val.time} </strong>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end items-center relative">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="text-2xl cursor-pointer"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => this.onClickVisible(val.id)}
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                            />
                          </svg>
                          {val.visible && (
                            <div className="absolute  mr-4 bg-white shadow">
                              <Link
                                to={`/appointment/edit/${val.id}`}
                                className="block px-6 py-1 hover:bg-gray-100 w-full focus:outline-none"
                              >
                                Edit
                              </Link>
                              <Link
                                to={`/appointment/view/${val.id}`}
                                className="block px-6 py-1 hover:bg-gray-100 w-full focus:outline-none"
                              >
                                View
                              </Link>
                              <button
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Do you really want to delete this Appointment?"
                                    )
                                  ) {
                                    this.handleDelete(val.id);
                                  }
                                }}
                                className="px-6 py-2 hover:bg-gray-100 w-full focus:outline-none"
                              >
                                Delete
                              </button>
                              {val.appointment_status.status === "cancel" && (
                                <button
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Activate this Appointment?"
                                      )
                                    ) {
                                      this.handleActive(val.id);
                                    }
                                  }}
                                  className="px-6 py-1 hover:bg-gray-100 w-full focus:outline-none"
                                >
                                  Active
                                </button>
                              )}
                              {val.appointment_status.status === "active" && (
                                <button
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Cancel this Appointment?"
                                      )
                                    ) {
                                      this.handleCancel(val.id);
                                    }
                                  }}
                                  className="px-6 py-1 hover:bg-gray-100 w-full focus:outline-none"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {this.state.showing && (
                <div className="p-5 text-center bg-red-400 rounded-lg  mt-5  text-white">
                  You Do Not Have Any Appointment
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Appointments);
