import axios from "axios";
export const URL = "http://localhost:3001/api"; 


export const getUser = async (id)=> {
    const res = await axios.get(`${URL}/users/${id}`);
    return res.data;
}

export const updateUser = async (id, formData) => {
    const res = await axios.put(`${URL}/users/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};