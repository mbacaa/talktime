import axios from "axios";

const formAxiosConfig = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: { "Content-Type": "multipart/form-data" },
});

export default formAxiosConfig;
