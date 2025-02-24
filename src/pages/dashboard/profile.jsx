import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Avatar,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { ProfileInfoCard } from "@/widgets/cards";
import { AuthContext } from "../../context/AuthContext.jsx";
import { getUser } from "@/api/users";
import { Link } from "react-router-dom"; // Importez Link pour la redirection

export function Profile() {
  const { getCurrentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = getCurrentUser();
      if (currentUser && currentUser.id) {
        try {
          const data = await getUser(currentUser.id);
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
      console.log(base64String);
    }
  }, [userData]);

  if (!userData) {
    return <Typography>Loading user data...</Typography>;
  }

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={imageSrc}
                alt="User Avatar"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {userData.firstName} {userData.lastName}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {userData.role || "User"}
                </Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <ProfileInfoCard
              title="Profile Information"
              description="about me"
              details={{
                "First Name": userData.firstName,
                "Last Name": userData.lastName,
                Gender: userData.gender,
                "Birth Date": userData.birthDate ? new Date(userData.birthDate).toISOString().slice(0, 10) : "N/A",
                Phone: userData.phone || "N/A",
                Email: userData.email,
              }}
              action={
                <Tooltip content="Edit Profile">
                  <Link to="/dashboard/edit-profile">
                    <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                  </Link>
                </Tooltip>
              }
              
            />
          </div>

          <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Projects
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              <Card color="transparent" shadow={false}>
                <CardBody className="py-0 px-1">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mt-1 mb-2"
                  >
                    {userData.project.name}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    {userData.project.status}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    {userData.project.description}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500 mt-2"
                  >
                    Start Date: {new Date(userData.project.startDate).toISOString().slice(0, 10)}
                  </Typography>
                </CardBody>
                <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                  <Button variant="outlined" size="sm">
                    View Project
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;