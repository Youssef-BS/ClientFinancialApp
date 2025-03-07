import axios from "axios";

export const URL = "http://localhost:3001/api";


export const getFiles = async () => {
  const res = await axios.get(`${URL}/files`);
  return res.data;
};


export const getFileById = async (id) => {
  const res = await axios.get(`${URL}/files/${id}`);
  return res.data;
};
