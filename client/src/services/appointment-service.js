import axios from "axios";
import authHeader from "./auth-header";
const API_URL = process.env.REACT_APP_BASE_URL + "/api/appointments";

class Appointment {
  getallappointments(status) {
    return axios.get(API_URL + "?status=" + status, { headers: authHeader() });
  }
  addNew(location, date, time, details) {
    return axios.post(
      API_URL + "/create",
      {
        location,
        date,
        time,
        details,
      },
      { headers: authHeader() }
    );
  }
  view(id) {
    return axios.get(API_URL + "/view/" + id, { headers: authHeader() });
  }
  update(location, date, time, details, id) {
    return axios.put(
      API_URL + "/update",
      {
        location,
        date,
        time,
        details,
        id,
      },
      { headers: authHeader() }
    );
  }
  active(id) {
    return axios.get(API_URL + "/active/" + id, { headers: authHeader() });
  }
  cancel(id) {
    return axios.get(API_URL + "/cancel/" + id, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL + "/destroy/" + id, { headers: authHeader() });
  }
}

export default new Appointment();
