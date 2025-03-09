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


export const getFileCSV = async (id) => {
  const res = await axios.get(`${URL}/files/${id}/csv`);
  return res.data; 
};

export const addFile = async (formData) => {
  const res = await axios.post(`${URL}/files/addfile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const editFile = async (id, formData) => {
  const res = await axios.put(`${URL}/files/editfile/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};


export const deleteFile = async (id) => {
  const res = await axios.delete(`${URL}/files/deletefile/${id}`);
  return res.data;
};