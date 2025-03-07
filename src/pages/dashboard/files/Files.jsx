import React, { useEffect, useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { getFiles } from "../../../api/files"; 

const Files = () => {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(10); 


  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await getFiles(); 
        setFiles(data); 
      } catch (error) {
        console.error("Erreur lors de la récupération des fichiers", error);
      }
    };

    fetchFiles();
  }, []); 

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                  <th className="px-6 py-3 text-left">URl</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentFiles.map((file, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition-colors duration-200`}
                  >
                    <td className="px-6 py-4">{file?.title}</td>
                    <td className="px-6 py-4">{file?.project}</td>
         
                    <td className="px-6 py-4">{file?.description}</td>
                    <td className="px-6 py-4">{file?.url.split('/').pop()}</td>


                    <td className="px-6 py-4">
                      <Button
                        variant="contained"
                        color="primary"
                       
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-6">
            {Array.from(
              { length: Math.ceil(files.length / filesPerPage) },
              (_, i) => (
                <Button
                  key={i + 1}
                  variant="outlined"
                  color={currentPage === i + 1 ? "primary" : "default"}
                  onClick={() => paginate(i + 1)}
                  className="mx-1"
                >
                  {i + 1}
                </Button>
              )
            )}
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
