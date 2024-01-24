import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/user/";
const API_URL2 = "http://localhost:8080/api/status/user/";
const API_URL3 = "http://localhost:8080/api/auth/signup";
const API_URL4 = "http://localhost:8080/api/user";

const getAllUser = () => {
  return axios.get(API_URL, { headers: authHeader() }).then(res => res.data);
};

const userFromExcel = (file) => {
  let formData = new FormData()
  formData.append("file", file)
  return axios.post(API_URL + "excel",formData, { headers: authHeader(), "Content-Type": "multipart/form-data"  });
};

const getAllUserPaginate = (params) => {
  return axios.get(API_URL4, { params: params, headers: authHeader() }).then(res => res.data);
};

const getAllUserByStatus = (data) => {
  return axios.get(API_URL2 + data, { headers: authHeader() }).then(res => res.data);
};

const getUserById = (id) => {
  return axios.get(API_URL + id, { headers: authHeader() });
};

const createUser = (data) => {
  return axios.post(API_URL3, data, { headers: authHeader() });
};

const editUser = (id, data) => {
  return axios.put(API_URL + id, data, { headers: authHeader() });
};

const deleteUser = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};


const UserService = {
  getAllUser,
  userFromExcel,
  getAllUserPaginate,
  getAllUserByStatus,
  getUserById,
  createUser,
  editUser,
  deleteUser,
};

export default UserService;
