import axios from "axios";
export const URL = "http://localhost:3001/api";  // Vérifier si le serveur backend est bien actif


<<<<<<< HEAD
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
=======
// Fonction pour récupérer les données de l'utilisateur
export const getUser = async (id) => {
  const res = await axios.get(`${URL}/users/${id}`);
  return res.data;
};

// Fonction pour mettre à jour les données de l'utilisateur
export const updateUser = async (id, userData) => {
  const res = await axios.put(`${URL}/users/${id}`, userData);
  return res.data;
};

// Fonction pour changer le mot de passe (tu peux l'utiliser plus tard si nécessaire)
export const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const response = await axios.put(`${URL}/users/change-password`, {
      userId,
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
>>>>>>> 9a332506927a31db0ce3f6eb31b8d733a3ba21cb
