import axios from "axios";

export const URL = "http://localhost:3001/api";

// 1. Get all files
export const getFiles = async () => {
  const res = await axios.get(`${URL}/files`);
  return res.data;
};

// 2. Get a single file by ID
export const getFileById = async (id) => {
  const res = await axios.get(`${URL}/files/${id}`);
  return res.data;
};

// 3. NEW: Get parsed CSV data for a file by ID
export const getFileCSV = async (id) => {
  const res = await axios.get(`${URL}/files/${id}/csv`);
  return res.data; 
};
