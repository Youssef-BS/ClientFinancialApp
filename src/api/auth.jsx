import axios from "axios";
export const URL = "http://localhost:3001/api"; 

export const auth = async (email, password) => {
  const res =  await axios.post(`${URL}/auth/login`, { email, password });
  return res;
};


