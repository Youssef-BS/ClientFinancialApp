import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFileCSV } from "../../../api/files"; 
import { Typography } from "@material-tailwind/react";

const FileCSVView = () => {
  const { id } = useParams(); 
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFileCSV(id);
        setCsvData(data);
      } catch (error) {
        console.error("Error fetching CSV data", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="p-4">
      <Typography variant="h4" className="mb-4">
        CSV Data for File: {id}
      </Typography>
      {csvData.length > 0 ? (
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              
              {Object.keys(csvData[0]).map((key, index) => (
                <th key={index} className="px-4 py-2 text-left">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {Object.keys(row).map((key, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2">
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Typography variant="h6">No data available</Typography>
      )}
    </div>
  );
};

export default FileCSVView;
