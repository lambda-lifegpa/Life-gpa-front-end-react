import axios from "axios";

const authentication = () => {
  return axios.create({
    headers: {
      "content-type": "application/json",
      username: localStorage.getItem("username"),
      Authorization: localStorage.getItem("token")
    }
  });
};

export default authentication;
