import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/upload/";
const API_URL2 = "http://localhost:8080/files/";

const uploadFile = (file) => {
  let formData = new FormData()
  formData.append("file", file)
  return axios.post(API_URL, formData, { headers: authHeader(), "Content-Type": "multipart/form-data" }).then(res => res.data);
};
const getFiles = () => {
  return axios.get(API_URL2, { headers: authHeader() }).then(res => res.data);
};
const getFilesbyName = (name) => {
  return axios.get(API_URL2 + name, { headers: authHeader() }).then(res => res.data);
};


const UploadService = {
  uploadFile,
  getFiles,
  getFilesbyName
};

export default UploadService;
