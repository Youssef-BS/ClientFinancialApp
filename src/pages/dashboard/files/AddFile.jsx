import { addFile } from "@/api/files";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AddFile = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "", 
    file: null,
  });

  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    if (location.state?.projectId) {
      setProjectId(location.state.projectId); 
      setFormData((prev) => ({ ...prev, project: location.state.projectId })); 
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.file) {
      alert("Please select a file to upload.");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("project", formData.project);
    formDataToSend.append("file", formData.file);
  
    try {
      const data = await addFile(formDataToSend);
     
      navigate("/dashboard/files");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed.");
    }
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h4 className="text-xl font-bold text-center mb-4">Upload CSV File</h4>

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
          onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        >
          Upload File
        </button>
      </form>
    </div>
  );
};

export default AddFile;
