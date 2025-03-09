import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import { editFile } from "@/api/files"; 

const EditFile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const fileFromState = location.state?.file;

  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    file: null, 
  });

  useEffect(() => {
    if (fileFromState) {
      setFormData({
        title: fileFromState.title || "",
        description: fileFromState.description || "",
        project: fileFromState.project || "",
        file: null,
      });
    } else {
    
      navigate("/dashboard/files");
    }
  }, [fileFromState, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("project", formData.project);
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    try {
 
      await editFile(fileFromState._id, formDataToSend);
      alert("File updated successfully!");
 
      navigate("/dashboard/files");
    } catch (error) {
      console.error("Error updating file:", error);
      alert("File update failed.");
    }
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <Typography variant="h4" className="text-center mb-4">
        Edit File
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Project"
          name="project"
          value={formData.project}
          onChange={handleInputChange}
          readOnly
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
        <div className="flex space-x-4">
          <Button type="submit" variant="contained" color="green">
            Update File
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="blue"
            onClick={() => navigate("/dashboard/files")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditFile;
