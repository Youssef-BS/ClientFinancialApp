import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Avatar,
} from "@material-tailwind/react";
import { AuthContext } from "@/context/AuthContext";
import { getUser, updateUser } from "@/api/users";
import { useNavigate } from "react-router-dom";
import { PencilIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export function EditProfile() {
  const { getCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    birthDate: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = getCurrentUser();
      if (currentUser && currentUser.id) {
        try {
          const data = await getUser(currentUser.id);
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            phone: data.phone || "",
            gender: data.gender || "",
            birthDate: data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : "",
            image: null,
          });
          
          // Set preview image if user has an existing image
          if (data.image?.data) {
            const buffer = new Uint8Array(data.image.data.data);
            const base64String = `data:${data.image.contentType};base64,${btoa(
              String.fromCharCode(...buffer)
            )}`;
            setPreviewImage(base64String);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to load user data");
        }
      }
    };

    fetchUserData();
  }, [getCurrentUser]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      
      // Create preview URL for the selected image
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGenderChange = (value) => {
    setFormData({ ...formData, gender: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const currentUser = getCurrentUser();
      if (!currentUser || !currentUser.id) {
        throw new Error("User not found");
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await updateUser(currentUser.id, formDataToSend);
      navigate("/dashboard/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-blue-gray-50/50">
      <div className="relative h-40 w-full overflow-hidden bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/30" />
      </div>
      <Card className="mx-3 -mt-20 mb-6 max-w-3xl lg:mx-auto">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-16 place-items-center"
        >
          <Typography variant="h4" color="white" className="font-normal">
            Edit Profile
          </Typography>
        </CardHeader>

        <CardBody className="flex flex-col gap-8 p-8">
          {error && (
            <div className="w-full rounded-lg bg-red-50 p-4">
              <Typography color="red" className="text-center font-medium">
                {error}
              </Typography>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar
                  src={previewImage || "/img/default-avatar.jpg"}
                  alt="Profile Picture"
                  size="xxl"
                  className="h-32 w-32 ring-4 ring-blue-500/30"
                />
                <label 
                  htmlFor="image-upload" 
                  className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-500 p-2 text-white shadow-lg transition-transform hover:scale-110"
                >
                  <PencilIcon className="h-4 w-4" />
                  <input
                    id="image-upload"
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
              <Typography variant="h6" color="blue-gray">
                Profile Picture
              </Typography>
            </div>

            {/* Personal Information Section */}
            <div className="space-y-4">
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Personal Information
              </Typography>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  type="text"
                  size="lg"
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="!border-t-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "!text-blue-gray-400",
                  }}
                  containerProps={{
                    className: "min-w-[100px]",
                  }}
                />
                <Input
                  type="text"
                  size="lg"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="!border-t-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "!text-blue-gray-400",
                  }}
                  containerProps={{
                    className: "min-w-[100px]",
                  }}
                />
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-4">
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Contact Information
              </Typography>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  type="email"
                  size="lg"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="!border-t-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "!text-blue-gray-400",
                  }}
                  containerProps={{
                    className: "min-w-[100px]",
                  }}
                />
                <Input
                  type="tel"
                  size="lg"
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="!border-t-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "!text-blue-gray-400",
                  }}
                  containerProps={{
                    className: "min-w-[100px]",
                  }}
                />
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-4">
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Additional Information
              </Typography>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Select
                  size="lg"
                  label="Gender"
                  value={formData.gender}
                  onChange={handleGenderChange}
                  className="!border-t-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "!text-blue-gray-400",
                  }}
                  containerProps={{
                    className: "min-w-[100px]",
                  }}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
                <Input
                  type="date"
                  size="lg"
                  label="Birth Date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="!border-t-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "!text-blue-gray-400",
                  }}
                  containerProps={{
                    className: "min-w-[100px]",
                  }}
                />
              </div>
            </div>

            <CardFooter className="flex gap-4 pt-8">
              <Button
                variant="text"
                color="red"
                onClick={() => navigate("/dashboard/profile")}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="gradient" 
                color="blue" 
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <PencilIcon className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default EditProfile; 