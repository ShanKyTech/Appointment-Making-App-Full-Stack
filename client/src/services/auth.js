export default function authenticate() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return true;
  } else {
    return false;
  }
}
