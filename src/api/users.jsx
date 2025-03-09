import axios from "axios";

export const URL = "http://localhost:3001/api";  // Assure-toi que l'URL est correcte

// Fonction pour récupérer les données de l'utilisateur
export const getUser = async (id) => {
  const res = await axios.get(`${URL}/users/${id}`);
  return res.data;
};

// Fonction pour mettre à jour les données de l'utilisateur
export const updateUser = async (id, userData) => {
  const res = await axios.put(`${URL}/users/updateUser/${id}`, userData);
  return res.data;
};

// Fonction pour changer le mot de passe
export const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const response = await axios.put(`http://localhost:3001/api/users/changePassword/${userId}`, {
      currentPassword : currentPassword,
      newPassword : newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors du changement de mot de passe :", error);
    throw error;
  }
};
