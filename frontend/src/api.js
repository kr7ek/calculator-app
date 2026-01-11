import axios from "axios";

const API = "http://localhost:4000";

export const calculate = (data) =>
  axios.post(`${API}/calculate`, data);

export const saveCalculation = (data) =>
  axios.post(`${API}/save`, data);

export const getHistory = () =>
  axios.get(`${API}/history`);