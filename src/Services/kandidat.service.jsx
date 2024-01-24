import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/kandidat/";

const getAllKandidat = () => {
  return axios.get(API_URL,{headers:authHeader()}).then(res => res.data);
};

const getKandidatById = (id) => {
  return axios.get(API_URL + id, { headers: authHeader() });
};

const createKandidat = (data) => {
  return axios.post(API_URL, data,{ headers: authHeader() });
};

const editKandidat = (id,data) => {
  return axios.put(API_URL + id,data, { headers: authHeader() });
};

const deleteKandidat = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};


const KandidatService = {
  getAllKandidat,
  getKandidatById,
  createKandidat,
  editKandidat,
  deleteKandidat,
};

export default KandidatService;
