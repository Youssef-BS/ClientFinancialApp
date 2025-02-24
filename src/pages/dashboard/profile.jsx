import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Typography,
  Button,
  Chip,
  Progress,
} from "@material-tailwind/react";
import {
  PencilIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { AuthContext } from "../../context/AuthContext.jsx";
import { getUser } from "@/api/users";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const { getCurrentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const navigate = useNavigate();

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
    }
  }, [userData]);

  const handleEditProfile = () => {
    navigate("/dashboard/edit-profile");
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Top header */}
      <div className="flex justify-between items-center mb-8">
        <Typography variant="h4" className="text-blue-gray-900">
          {userData.firstName} {userData.lastName}
        </Typography>
        <Button
          variant="filled"
          color="blue"
          className="flex items-center gap-2 px-4 py-2 bg-[#2196f3] capitalize text-sm"
          onClick={handleEditProfile}
        >
          <PencilIcon className="h-4 w-4" /> Edit Profile
        </Button>
      </div>

      {/* Profile Info Section */}
      <div className="flex flex-col items-center mb-12">
        <Avatar
          src={imageSrc || "/img/default-avatar.jpg"}
          alt="User Avatar"
          size="xxl"
          className="h-24 w-24 mb-4"
        />
        <Typography variant="h4" className="text-blue-gray-900 mb-2">
          {userData.firstName} {userData.lastName}
        </Typography>
        <div className="flex flex-col items-center gap-1 text-sm text-blue-gray-600">
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="h-4 w-4" />
            <span>{userData.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-4 w-4" />
            <span>{userData.phone}</span>
          </div>
        </div>
        <Chip
          value="PROJECT MANAGER"
          className="mt-4 bg-[#2196f3] text-white normal-case text-xs px-3"
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="shadow-none">
          <CardHeader
            color="blue"
            className="h-12 flex items-center justify-center bg-[#2196f3] mb-0"
          >
            <Typography variant="h6" color="white" className="text-base">
              Personal Information
            </Typography>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-4">
              <div>
                <Typography variant="small" className="text-blue-gray-600 mb-1">
                  Gender
                </Typography>
                <Typography variant="small" className="text-blue-gray-900">
                  {userData.gender}
                </Typography>
              </div>
              <div>
                <Typography variant="small" className="text-blue-gray-600 mb-1">
                  Birth Date
                </Typography>
                <Typography variant="small" className="text-blue-gray-900">
                  {userData.birthDate}
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Current Project */}
        <Card className="shadow-none">
          <CardHeader
            color="blue"
            className="h-12 flex items-center justify-center bg-[#2196f3] mb-0"
          >
            <Typography variant="h6" color="white" className="text-base">
              Current Project
            </Typography>
          </CardHeader>
          <CardBody className="p-6">
            <Typography variant="h6" className="text-blue-gray-900 mb-2">
              {userData.project?.name}
            </Typography>
            <Typography variant="small" className="text-blue-gray-600 mb-4">
              {userData.project?.description}
            </Typography>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Typography variant="small" className="text-blue-gray-600">
                  Status
                </Typography>
                <Chip
                  value="ONGOING"
                  className="bg-[#2196f3] text-white normal-case text-xs px-3"
                />
              </div>
              <Typography variant="small" className="text-blue-gray-600">
                Started: {userData.project?.startDate}
              </Typography>
            </div>
            <Button 
              variant="outlined"
              className="w-full normal-case text-[#2196f3] border-[#2196f3] text-sm"
            >
              View Project Details
            </Button>
          </CardBody>
        </Card>

        {/* Activity Status */}
        <Card className="shadow-none">
          <CardHeader
            color="blue"
            className="h-12 flex items-center justify-center bg-[#2196f3] mb-0"
          >
            <Typography variant="h6" color="white" className="text-base">
              Activity Status
            </Typography>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Typography variant="small" className="text-blue-gray-600">
                    Project Completion
                  </Typography>
                  <Typography variant="small" className="text-blue-gray-900">
                    75%
                  </Typography>
                </div>
                <Progress value={75} className="h-1 bg-blue-gray-50" barProps={{ className: "bg-[#2196f3]" }} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Typography variant="small" className="text-blue-gray-600">
                    Tasks Completed
                  </Typography>
                  <Typography variant="small" className="text-blue-gray-900">
                    18/24
                  </Typography>
                </div>
                <Progress value={75} className="h-1 bg-blue-gray-50" barProps={{ className: "bg-green-500" }} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
