import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useState } from "react";

const schema = yup.object().shape({
  CIN: yup.string().required("CIN is required").matches(/^\d{8}$/, "CIN must be exactly 8 numbers").min(8, "CIN must be exactly 8 characters").max(8, "CIN must be exactly 8 characters"),
  firstName: yup.string().required("First name is required").min(3, "First name must be at least 3 characters"),
  lastName: yup.string().required("Last name is required").min(3, "Last name must be at least 3 characters"),
  gender: yup.string().oneOf(["male", "female"], "Invalid gender").required("Gender is required"),
  birthDate: yup.date().required("Birth date is required"),
  phone: yup.string().matches(/^\d{8}$/, "CIN must be exactly 8 numbers").required("Phone is required").min(8, "Phone must be at least 8 characters").max(8, "Phone must be at most 8 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirmation is required"),
  role: yup.string().required("Role is required"),
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
    if (!["accountant", "financial manager", "auditeur", "manager controller"].includes(data.role)) {
      Swal.fire("Error", "Invalid role. Please choose a valid role.", "error");
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
      Swal.fire("Success", "User added successfully!", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
<div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-2xl transform transition-all duration-300 hover:shadow-3xl">
  <h2 className="text-3xl font-bold mb-8 text-center text-gray-800" >Add User</h2>
  <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* CIN */}
    <div className="flex flex-col space-y-2">
      <label className="font-semibold text-gray-700">CIN :</label>
      <input
        {...register("CIN")}
        placeholder="CIN"
        className="input-box focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      />
      {errors.CIN && <p className="text-red-500 text-sm mt-1">{errors.CIN.message}</p>}
    </div>

    {/* First Name */}
    <div className="flex flex-col space-y-2">
      <label className="font-semibold text-gray-700">First Name :</label>
      <input
        {...register("firstName")}
        placeholder="First Name"
        className="input-box focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      />
      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
    </div>

    {/* Last Name */}
    <div className="flex flex-col space-y-2">
      <label className="font-semibold text-gray-700">Last Name :</label>
      <input
        {...register("lastName")}
        placeholder="Last Name"
        className="input-box focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      />
      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
    </div>

    {/* Gender */}
    <div className="flex flex-col space-y-2">
      <label className="font-semibold text-gray-700">Gender :</label>
      <select
        {...register("gender")}
        className="input-box focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      >
        <option value="">Select a gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
    </div>

    {/* Birth Date */}
    <div className="flex flex-col space-y-2">
      <label className="font-semibold text-gray-700">Birth Date :</label>
      <input
        type="date"
        {...register("birthDate")}
        className="input-box focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      />
      {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>}
    </div>

    {/* Phone */}
    <div className="flex flex-col space-y-2">
      <label className="font-semibold text-gray-700">Phone :</label>
      <input
        type="text"
        {...register("phone")}
        placeholder="Phone"
        className="input-box focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      />
    </div>

    {/* Email */}
    <div className="flex flex-col space-y-2">
      <label className="font-semibold text-gray-700">Email :</label>
      <input
        type="email"
        {...register("email")}
        placeholder="Email"
        className="input-box focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      />
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
    </div>

    {/* Password */}
    <div className="flex flex-col space-y-2">
      <label className="font-semibold text-gray-700">Password :</label>
      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className="input-box focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      />
      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
    </div>

    {/* Confirm Password */}
    <div className="flex flex-col space-y-2">
      <label className="font-semibold text-gray-700">Confirm Password :</label>
      <input
        type="password"
        {...register("confirmPassword")}
        placeholder="Confirm Password"
        className="input-box focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      />
      {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
    </div>

    {/* Role */}
    <div className="flex flex-col space-y-2">
      <label className="font-semibold text-gray-700">Role :</label>
      <select
        {...register("role")}
        className="input-box focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      >
        <option value="">Select role</option>
        <option value="accountant">Accountant</option>
        <option value="financial manager">Financial Manager</option>
        <option value="auditeur">Auditeur</option>
        <option value="manager controller">Manager Controller</option>
      </select>
      {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
    </div>

    {/* Image Upload */}
    <div className="flex flex-col space-y-2 col-span-full">
      <label className="font-semibold text-gray-700">Image :</label>
      <div className="flex items-center space-x-4">
        <input
          type="file"
          {...register("image")}
          className="input-box focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
          onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow-sm"
          />
        )}
      </div>
    </div>

    {/* Submit Button */}
    <div className="col-span-full text-center mt-6">
      <button
        type="submit"
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Ajouter
      </button>
    </div>
  </form>
</div>
  );
};

export default AddUser;
