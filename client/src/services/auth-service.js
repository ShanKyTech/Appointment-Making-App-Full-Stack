import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL + "/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        email: username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(first_name, last_name, phone, address, dob, email, password) {
    return axios.post(API_URL + "signup", {
      first_name,
      last_name,
      phone,
      address,
      dob,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
