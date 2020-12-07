import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Appointment from "../../services/appointment-service";
class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      showing: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.onClickVisible = this.onClickVisible.bind(this);
  }
  handleDelete(id) {
    Appointment.delete(id).then((res) => {
      if (res.status === 200) {
        this.setState({
          appointments: this.state.appointments.filter(function (data) {
            return data.id !== id;
          }),
        });
      }
    });
  }
  componentDidMount() {
    Appointment.getallappointments().then((res) => {
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
      <div className="max-w-2xl w-full mx-auto">
        <h1 className="text-4xl text-center mb-2 font-thin pt-5">
          Appointments
        </h1>
        <Link
          to="/appointment/add-new"
          className="block w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow text-center"
        >
          Add Appointment
        </Link>
        {!this.state.showing && (
          <div className="mt-5">
            {this.state.appointments.map((val, key) => {
              return (
                <div
                  key={key}
                  className="p-5 flex bg-white shadow-lg border-t border-gray-100 mb-5"
                >
                  <div className="w-6/12">
                    <p className="py-1">
                      Name:
                      <strong>
                        {val.user.first_name + " " + val.user.last_name}
                      </strong>
                    </p>
                    <p className="py-1">
                      Email: <strong> {val.user.email} </strong>
                    </p>
                    <p className="py-1">
                      DOB: <strong> {val.user.dob} </strong>
                    </p>
                  </div>
                  <div className="w-5/12">
                    <p className="py-1">
                      Location: <strong> {val.location}</strong>
                    </p>
                    <p className="py-1">
                      Date: <strong> {val.date} </strong>
                    </p>
                    <p className="py-1">
                      Time: <strong> {val.time} </strong>
                    </p>
                  </div>
                  <div className="w-1/12 flex justify-end items-center relative">
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
                      <div className="absolute top-0 mt-6 mr-4 bg-white shadow">
                        <Link
                          to={`/appointment/edit/${val.id}`}
                          className="block px-6 py-2 hover:bg-gray-100 w-full focus:outline-none"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure to delete this record?"
                              )
                            ) {
                              this.handleDelete(val.id);
                            }
                          }}
                          className="px-6 py-2 hover:bg-gray-100 w-full focus:outline-none"
                        >
                          Delete
                        </button>
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
            Data not found
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Appointments);
