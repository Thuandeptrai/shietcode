import axios from "axios";

const instance = axios.create({
  baseURL: "http://159.223.71.166:5010",
});

export default instance;