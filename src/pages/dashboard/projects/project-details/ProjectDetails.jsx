import React, { useEffect, useState } from "react";
import ProjectCards from "./card/ProjectCards";
import { getProjectById } from "@/api/project";
import { useParams } from "react-router-dom";
import IsLoading from "@/configs/isLoading";

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjectById(id);
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchData();
  }, [id]); 

  if (!project) {
    return <IsLoading />;
  }

  return (
    
      <ProjectCards 
        title={project.title} 
        description={project.description} 
        startDate={new Date(project.startDate).toLocaleDateString()} 
        status={project.status} 
      />

  );
};

export default ProjectDetails;
