import axios from "axios";

const instance = axios.create({
  baseURL: "http://159.223.71.166:5010"
});
instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user"))?.jwt_token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if(error.response.status === 401){
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default instance;
