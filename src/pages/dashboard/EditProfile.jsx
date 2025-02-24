import { useState, useEffect, useContext } from "react";
import { Card, CardBody, Typography, Button, Input } from "@material-tailwind/react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { getUser, updateUser, changePassword } from "@/api/users";
import { useNavigate } from "react-router-dom";

export function EditProfile() {
  const { getCurrentUser } = useContext(AuthContext);
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    phone: "",
    email: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Charger les données depuis l'API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser(currentUser.id);
        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          gender: data.gender || "",
          birthDate: data.birthDate ? new Date(data.birthDate).toISOString().slice(0, 10) : "",
          phone: data.phone || "",
          email: data.email || "",
        });
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    if (currentUser?.id) {
      fetchUserData();
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      await changePassword(currentUser.id, currentPassword, newPassword);
      alert("Mot de passe changé avec succès !");
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe :", error);
      setError(error.response?.data?.message || "Erreur inconnue.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(currentUser.id, userData);
      alert("Profil mis à jour avec succès !");
      navigate("/profile");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };

  return (
    <Card className="mx-3 mt-8 mb-6 lg:mx-4 border border-blue-gray-100">
      <CardBody className="p-4">
        <Typography variant="h4" color="blue-gray" className="mb-6">
          Modifier le Profil
        </Typography>

        {/* Formulaire de modification du profil */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Prénom" name="firstName" value={userData.firstName} onChange={handleInputChange} />
          <Input label="Nom" name="lastName" value={userData.lastName} onChange={handleInputChange} />
          <Input label="Genre" name="gender" value={userData.gender} onChange={handleInputChange} />
          <Input type="date" label="Date de naissance" name="birthDate" value={userData.birthDate} onChange={handleInputChange} />
          <Input label="Téléphone" name="phone" value={userData.phone} onChange={handleInputChange} />
          <Input label="Email" name="email" value={userData.email} onChange={handleInputChange} />
          <Button type="submit" color="blue">
            Enregistrer les modifications
          </Button>
        </form>

        {/* Formulaire de changement de mot de passe */}
        <Typography variant="h5" color="blue-gray" className="mt-6">
          Changer le mot de passe
        </Typography>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <Input type="password" label="Mot de passe actuel" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <Input type="password" label="Nouveau mot de passe" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <Input type="password" label="Confirmer le nouveau mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {error && <Typography color="red">{error}</Typography>}
          <Button type="submit" color="blue">
            Modifier le mot de passe
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default EditProfile;
