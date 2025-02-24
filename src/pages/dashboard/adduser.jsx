import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useState } from "react";

const schema = yup.object().shape({
  CIN: yup.string().required("CIN est requis"),
  firstName: yup.string().required("Prénom est requis"),
  lastName: yup.string().required("Nom est requis"),
  gender: yup.string().oneOf(["male", "female"], "Genre invalide").required("Genre est requis"),
  birthDate: yup.date().required("Date de naissance requise"),
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup.string().min(6, "Mot de passe trop court").required("Mot de passe requis"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Les mots de passe ne correspondent pas").required("Confirmation requise"),
  role: yup.string().required("Rôle requis"),
  image: yup.mixed(),
});

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    // Vérification du rôle avant d'envoyer la requête
    if (!["accountant"," financial manager", "auditeur", "manager controller"].includes(data.role)) {
      Swal.fire("Erreur", "Rôle invalide. Veuillez choisir un rôle valide.", "error");
      return; // Arrêter l'exécution si le rôle est invalide
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "image") formData.append(key, data[key]);
    });
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await fetch("http://localhost:3001/api/users/add", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message);
      Swal.fire("Succès", "Utilisateur ajouté avec succès!", "success");
    } catch (error) {
      Swal.fire("Erreur", error.message, "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Ajouter un utilisateur</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("CIN")} placeholder="CIN" className="input" />
        {errors.CIN && <p className="error">{errors.CIN.message}</p>}

        <input {...register("firstName")} placeholder="Prénom" className="input" />
        {errors.firstName && <p className="error">{errors.firstName.message}</p>}

        <input {...register("lastName")} placeholder="Nom" className="input" />
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}

        <select {...register("gender")} className="input">
          <option value="">Choisir un genre</option>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
        </select>
        {errors.gender && <p className="error">{errors.gender.message}</p>}

        <input type="date" {...register("birthDate")} className="input" />
        {errors.birthDate && <p className="error">{errors.birthDate.message}</p>}

        <input type="text" {...register("phone")} placeholder="Téléphone" className="input" />

        <input type="email" {...register("email")} placeholder="Email" className="input" />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input type="password" {...register("password")} placeholder="Mot de passe" className="input" />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <input type="password" {...register("confirmPassword")} placeholder="Confirmer le mot de passe" className="input" />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

        <select {...register("role")} className="input">
          <option value="">Choisir un rôle</option>
          <option value="Accountant">Accountant</option>
          <option value="Financial Manager">Financial Manager</option>
          <option value="External auditeur">Auditeur</option>
          <option value="Manager Controller">Manager Controller</option>
        </select>
        {errors.role && <p className="error">{errors.role.message}</p>}

        <input type="file" {...register("image")} className="input" onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))} />
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 mt-2 rounded-full object-cover" />}

        <button type="submit" className="btn">Ajouter</button>
      </form>
    </div>
  );
};

export default AddUser;
