import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { ProfileInfoCard } from "@/widgets/cards";
import { AuthContext } from "@/context/AuthContext.jsx";
import { EditProfile } from "./EditProfile.jsx";
import IsLoading from "@/configs/isLoading.jsx";
import { getUserWithProjects } from "@/api/project.jsx";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const history = useNavigate();
  const { getCurrentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [updateUser, setUpdateUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5); 

  const toggleEdit = () => setUpdateUser(!updateUser);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = getCurrentUser();
      if (currentUser?.id) {
        try {
          const data = await getUserWithProjects(currentUser.id);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [getCurrentUser]);

  useEffect(() => {
    if (userData?.image?.data) {
      const buffer = new Uint8Array(userData.image.data.data);
      const base64String = `data:${userData.image.contentType};base64,${btoa(
        String.fromCharCode(...buffer)
      )}`;
      setImageSrc(base64String);
      setIsLoading(false);
    }
  }, [userData]);


  const handleDetails = (id) => {
    history(`/dashboard/project-details/${id}`);
  }

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = userData?.projects?.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isLoading && <IsLoading />}
      {updateUser && !isLoading ? (
        <EditProfile  onBack={toggleEdit}/>
      ) : (
        !isLoading && (
          <>
            <div className="relative mt-8 h-96 w-full overflow-hidden rounded-xl bg-gradient-to-r from-green-500 to-blue-500">
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Typography variant="h1" className="text-white text-5xl font-bold">
                  Welcome, {userData?.firstName}!
                </Typography>
              </div>
            </div>

            {/* Profile Card */}
            <Card className="mx-4 -mt-24 mb-6 border-0 shadow-xl rounded-2xl bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8">
                <div className="flex items-center gap-6">
                  <Avatar
                    src={imageSrc}
                    alt="User Avatar"
                    size="xxl"
                    variant="circular"
                    className="rounded-full border-4 border-white shadow-2xl"
                  />
                  <div>
                    <Typography variant="h3" className="text-gray-900">
                      {userData?.firstName} {userData?.lastName}
                    </Typography>
                    <Typography variant="h6" className="text-gray-600">
                      {userData?.role || "User"}
                    </Typography>
                  </div>
                </div>

                <Tooltip content="Edit Profile">
                  <Button
                    variant="gradient"
                    size="lg"
                    color="green"
                    onClick={toggleEdit}
                    className="flex items-center gap-2 shadow-lg hover:shadow-green-500/40"
                  >
                    <PencilIcon className="h-5 w-5" />
                    Edit Profile
                  </Button>
                </Tooltip>
              </div>
            </Card>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mx-4">
              {/* Profile Information Card */}
              <Card className="p-6 border-0 shadow-lg rounded-2xl bg-gradient-to-r from-green-50 to-blue-50">
                <Typography variant="h4" className="text-gray-900 mb-6">
                  Profile Information
                </Typography>
                <ProfileInfoCard
                  description="about me"
                  details={{
                    "First Name": userData?.firstName,
                    "Last Name": userData?.lastName,
                    Gender: userData?.gender,
                    "Birth Date": userData?.birthDate
                      ? new Date(userData?.birthDate).toISOString().slice(0, 10)
                      : "N/A",
                    Phone: userData?.phone || "N/A",
                    Email: userData?.email,
                  }}
                />
              </Card>

              {/* Projects Section */}
              <div className="col-span-2">
                <Typography variant="h4" className="text-gray-900 mb-6">
                  Projects
                </Typography>
                {userData?.projects?.length > 0 ? (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px] table-auto">
                        <thead>
                          <tr className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                            <th className="px-6 py-3 text-left">Project Name</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3 text-left">Start Date</th>
                            <th className="px-6 py-3 text-left">Description</th>
                            <th className="px-6 py-3 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentProjects?.map((project, index) => (
                            <tr
                              key={index}
                              className={`${
                                index % 2 === 0 ? "bg-gray-50" : "bg-white"
                              } hover:bg-gray-100 transition-colors duration-200`}
                            >
                              <td className="px-6 py-4">{project?.title}</td>
                              <td className="px-6 py-4">
                                <span
                                  className={`px-2 py-1 rounded-full text-sm ${
                                    project?.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : project?.status === "In Progress"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {project?.status}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {new Date(project?.startDate).toISOString().slice(0, 10)}
                              </td>
                              <td className="px-6 py-4">{project?.description}</td>
                              <td className="px-6 py-4">
                                <Button
                                  variant="gradient"
                                  size="sm"
                                  color="green"
                                  className="shadow-md hover:shadow-green-500/40"
                                  onClick={()=>handleDetails(project._id)}
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
                        { length: Math.ceil(userData?.projects?.length / projectsPerPage) },
                        (_, i) => (
                          <Button
                            key={i + 1}
                            variant="text"
                            color={currentPage === i + 1 ? "green" : "gray"}
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
                    No projects found.
                  </Typography>
                )}
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}

export default Profile;