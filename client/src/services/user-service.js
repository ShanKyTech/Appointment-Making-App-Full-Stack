import axios from "axios";
import authHeader from "./auth-header";
const API_URL = process.env.REACT_APP_BASE_URL + "/api/users";

class User {
  Upload(id, data) {
    return axios.post(
      API_URL + "/upload/image",
      {
        id,
        data,
      },
      { headers: authHeader() }
    );
  }
  getAvatar(id) {
    return axios.get(API_URL + "/image/" + id, { headers: authHeader() });
  }
}

export default new User();
