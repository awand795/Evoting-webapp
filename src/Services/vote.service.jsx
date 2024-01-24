import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/vote/";

const getAllVote = () => {
  return axios.get(API_URL,{headers:authHeader()}).then(res => res.data);
};

const getVote = (id) => {
  return axios.get(API_URL+id,{headers:authHeader()}).then(res => res.data);
};
const createVote = (data) => {
  return axios.post(API_URL,data, { headers: authHeader() });
};

const VoteService = {
  getAllVote,
  getVote,
  createVote,
};

export default VoteService;
