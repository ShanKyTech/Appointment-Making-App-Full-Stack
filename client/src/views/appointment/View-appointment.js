import moment from "moment";
import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link, withRouter } from "react-router-dom";
import AppointmentService from "../../services/appointment-service";
class Appointments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      location: "",
      date: new Date(),
      time: "",
      user: {},
      details: "",
    };
  }

  componentDidMount() {
    AppointmentService.view(this.props.match.params.id).then((res) => {
      this.setState({
        location: res.data.location,
        date: new Date(res.data.date),
        time: res.data.time,
        id: res.data.id,
        user: res.data.user,
        details: res.data.details,
      });
    });
  }
  render() {
    return (
      <div className="max-w-2xl w-full mx-auto">
        <h1 className="text-4xl text-center mb-2 font-thin pt-5">
          View appointment
        </h1>
        <Link
          to="/appointments"
          className="block w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow text-center"
        >
          Back
        </Link>
        <div className="mt-5">
          <table className="table table-auto w-full">
            <tr>
              <td className="w-40 lg:w-52">Name</td>
              <td>:</td>
              <td>
                {this.state.user.first_name + " " + this.state.user.last_name}
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>{this.state.user.email}</td>
            </tr>
            <tr>
              <td>DOB</td>
              <td>:</td>
              <td>{this.state.user.dob}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>:</td>
              <td> {this.state.location}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>:</td>
              <td> {moment(this.state.date).format("DD/MM/YYYY")}</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>:</td>
              <td> {this.state.time}</td>
            </tr>
            <tr>
              <td>Message</td>
              <td>:</td>
              <td> {this.state.details}</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
export default withRouter(Appointments);
