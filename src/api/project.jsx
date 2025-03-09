import axios from "axios";

export const URL = "http://localhost:3001/api";

export const getUserWithProjects = async (id) => {
    const res = await axios.get(`${URL}/project/${id}`);
    return res.data;
  };

export const getProjectById = async (id) => {
    const res = await axios.get(`${URL}/project/project-details/${id}`);
    return res.data;
  }
