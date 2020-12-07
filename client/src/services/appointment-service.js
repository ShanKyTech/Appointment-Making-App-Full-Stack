import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/appointments";

class Appointment {
  getallappointments() {
    return axios.get(API_URL, { headers: authHeader() });
  }
  addNew(location, date, time) {
    return axios.post(
      API_URL + "/create",
      {
        location,
        date,
        time,
      },
      { headers: authHeader() }
    );
  }
  view(id) {
    return axios.get(API_URL + "/view/" + id, { headers: authHeader() });
  }
  update(location, date, time, id) {
    return axios.post(
      API_URL + "/update",
      {
        location,
        date,
        time,
        id,
      },
      { headers: authHeader() }
    );
  }
  delete(id) {
    return axios.delete(API_URL + "/destroy/" + id, { headers: authHeader() });
  }
}

export default new Appointment();
