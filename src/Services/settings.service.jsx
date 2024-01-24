import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/settings/";

const getSettings = () => {
  return axios.get(API_URL,{headers:authHeader()}).then(res => res.data);
};
const editSettings = (id,data) => {
  return axios.put(API_URL + id,data, { headers: authHeader() });
};

const SettingsService = {
  getSettings,
  editSettings,
};

export default SettingsService;
