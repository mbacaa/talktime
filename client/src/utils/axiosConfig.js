import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
});

const formAxiosConfig = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: { "Content-Type": "multipart/form-data" },
});

export { axiosConfig, formAxiosConfig };
