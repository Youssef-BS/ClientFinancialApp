import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import { getFiles, deleteFile } from "../../../api/files"; 

const Files = () => {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(10);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await getFiles(); 
        setFiles(data); 
      } catch (error) {
        console.error("Error fetching files", error);
      }
    };

    fetchFiles();
  }, []); 

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewClick = (fileId) => {
    navigate(`/dashboard/files/${fileId}`);
  };

  // Redirige vers la page d'édition en passant le fichier à éditer dans l'état
  const handleEditClick = (file) => {
    navigate(`/dashboard/files/edit/${file._id}`, { state: { file } });
  };

  // Supprime le fichier et met à jour la liste
  const handleDeleteClick = async (fileId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this file?");
    if (confirmDelete) {
      try {
        await deleteFile(fileId);
        // Mise à jour de la liste en retirant le fichier supprimé
        setFiles(prevFiles => prevFiles.filter(file => file._id !== fileId));
        alert("File deleted successfully!");
      } catch (error) {
        console.error("Error deleting file", error);
        alert("Failed to delete file.");
      }
    }
  };

  return (
    <div className="col-span-2">
      <Typography variant="h4" className="text-gray-900 mb-6">
        Files
      </Typography>
      {files.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] table-auto">
              <thead>
                <tr className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  <th className="px-6 py-3 text-left">File Name</th>
                  <th className="px-6 py-3 text-left">Project ID</th>
                  <th className="px-6 py-3 text-left">Description</th>
                  <th className="px-6 py-3 text-left">URL</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentFiles.map((file, index) => (
                  <tr
                    key={file._id} 
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors duration-200`}
                  >
                    <td className="px-6 py-4">{file?.title}</td>
                    <td className="px-6 py-4">{file?.project}</td>
                    <td className="px-6 py-4">{file?.description}</td>
                    <td className="px-6 py-4">{file?.url.split("/").pop()}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewClick(file._id)}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          color="blue"
                          onClick={() => handleEditClick(file)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="red"
                          onClick={() => handleDeleteClick(file._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-6">
            {Array.from({ length: Math.ceil(files.length / filesPerPage) }, (_, i) => (
              <Button
                key={i + 1}
                variant="outlined"
                color={currentPage === i + 1 ? "primary" : "default"}
                onClick={() => paginate(i + 1)}
                className="mx-1"
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <Typography variant="h6" className="text-gray-600">
          No files found.
        </Typography>
      )}
    </div>
  );
};

export default Files;
