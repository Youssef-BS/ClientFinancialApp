import axios from "axios";
import { useState, useContext } from "react";
import { auth } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import "./LoginSignup.css";
import Swal from "sweetalert2";
import IsLoading from "@/configs/isLoading";

const LoginSignupForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({
    CIN: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
    image: null,
    project: {
      name: "",
      description: "",
      startDate: "",
      status: "",
    },
  });
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else if (name.startsWith("project")) {
      setFormData({
        ...formData,
        project: { ...formData.project, [name.split(".")[1]]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleNext = async () => {
    let newErrors = {};
  
    if (step === 1) {
      if (!formData.CIN) newErrors.CIN = "CIN is required";
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.birthDate) newErrors.birthDate = "Birth date is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (!formData.email) newErrors.email = "Email is required";
  
      if (formData.firstName && formData.firstName.length < 3) {
        newErrors.firstName = "First name must contain at least 3 characters.";
      }
      if (formData.lastName && formData.lastName.length < 3) {
        newErrors.lastName = "Last name must contain at least 3 characters.";
      }
      if (formData.CIN && !/^[0-9]{8}$/.test(formData.CIN)) {
        newErrors.CIN = "CIN must contain exactly 8 digits.";
      }
      if (formData.phone && !/^[0-9]{8}$/.test(formData.phone)) {
        newErrors.phone = "Phone number must contain exactly 8 digits.";
      }
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: 'Please correct the errors before continuing.',
        });
        return;
      }
  

      axios.post("http://localhost:3001/api/auth/check", {
        email: formData.email,
      })
      .then((emailCheckResponse) => {
        if (emailCheckResponse.data.exists) {
    
          Swal.fire({
            icon: 'error',
            title: 'Email Already Exists',
            text: 'This email is already registered. Please use a different email.',
          });
          return; 
        }
      
        
        return axios.post("http://localhost:3001/api/auth/send", {
          email: formData.email,
        });
      })
      .then((response) => {
        if (response && response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Check your email for the verification code.',
          });
          setStep(2); 
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while checking the email or sending the verification code.',
        });
      })
    }
    if (step === 2) {

      if (!formData.password || !formData.confirmPassword || !formData.verificationCode) {
        Swal.fire({
          icon: 'warning',
          title: 'Missing Fields',
          text: 'All fields must be filled out.',
        });
        return;
      }
  
      if (formData.password.length < 6) {
        Swal.fire({
          icon: 'error',
          title: 'Input Error',
          text: 'Password must contain at least 6 characters.',
        });
        return;
      }
  
      if (formData.password !== formData.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Input Error',
          text: 'Passwords do not match.',
        });
        return;
      }
      try {
        const response = await axios.post("http://localhost:3001/api/auth/verify", {
          email: formData.email,
          verificationCode: formData.verificationCode,
        });
  
        if (response.status === 200) {
          setStep(3); 
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Incorrect Code',
            text: 'Please try again.',
          });
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while verifying the code.',
        });
      }
    }
  
    if (step === 3) {
      let newErrors = { project: {} };
    
      if (!formData.project.name) newErrors.project.name = "Project name is required.";
      if (!formData.project.description) newErrors.project.description = "Project description is required.";
      if (!formData.project.startDate) newErrors.project.startDate = "Start date is required.";
      if (!formData.project.status) newErrors.project.status = "Project status is required.";
    
      if (Object.keys(newErrors.project).length > 0) {
        setErrors(newErrors);
        Swal.fire({
          icon: 'warning',
          title: 'Missing Fields',
          text: 'All project fields must be filled out.',
        });
        return;
      }

      handleSubmit();
    }
  
  
  };
  const [userImage, setUserImage] = useState(null);

  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    formDataToSend.append("CIN", formData.CIN);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("birthDate", formData.birthDate);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("confirmPassword", formData.confirmPassword);
  
    formDataToSend.append("projectName", formData.project.name);
    formDataToSend.append("projectDescription", formData.project.description);
    formDataToSend.append("projectStartDate", formData.project.startDate);
    formDataToSend.append("projectStatus", formData.project.status || "planned");
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
  
    try {
      const response = await axios.post("http://localhost:3001/api/auth/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    
      if (response.status === 201) {
  
        Swal.fire({
          icon: 'success',
          title: 'Registered Successfully! 🎉',
          text: 'Your account has been created successfully.',
        });
    
        
        setStep(4);
    
        setUserImage(`http://localhost:3001/uploads/${response.data.image}`);
      } else {

        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'An error occurred during registration.',
        });
      }
    } catch (err) {
      console.error("❌ Registration Error:", err.response?.data || err.message);
    
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'An error occurred during registration.',
      });
    }
  };

 
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
  
    try {
      if (!email || !password) {
        dispatch({ type: "LOGIN_FAILURE", payload: "Please fill all fields" });
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please fill all fields",
        });
        return;
      }
  
      const res = await auth(email, password);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: res.data.user,
          token: res.data.token,
        },
      });
  
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data.message || "Login failed";
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
  
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    }
  };

  const handleForgotPassword = () => {
    alert("Please check your email for the password reset link");
  };
  const handleFaceLogin = async () => {
    try {
      const response = await axios.get('http://localhost:5010/get_person_data');
      
      if (response.status === 200 && response.data) {
        const { firstName, lastName, email } = response.data;
  
        // Simuler une connexion réussie
        dispatch({ 
          type: "LOGIN_SUCCESS", 
          payload: { 
            user: { firstName, lastName, email }, 
            token: "fake-token-for-face-login" 
          } 
        });
  
        // Redirection vers le tableau de bord
        navigate("/dashboard/home");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Face recognition failed!',
        });
      }
    } catch (error) {
      console.error('Face login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred during face recognition!',
      });
    }
  };
  return (
    <div className="login-signup">
      <div className={`container ${isSignUp ? "active" : ""}`}>
        {isSignUp ? (
          <div className="form-box register">
            <form onSubmit={(e) => e.preventDefault()}>
            {step !== 4 && (
  <>
    {/* Title */}
    <h1>Inscription</h1>

    {/* Progress Bar */}
    <div className="progress-bar">
      <div
        className={`progress-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}
        onClick={() => setStep(1)}
      >
        <i className="bx bxs-user"></i>
      </div>
      <div className="progress-line"></div>
      <div
        className={`progress-step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}
        onClick={() => setStep(2)}
      >
        <i className="bx bxs-lock-alt"></i>
      </div>
      <div className="progress-line"></div>
      <div
        className={`progress-step ${step >= 3 ? "active" : ""}`}
        onClick={() => setStep(3)}
      >
        <i className="bx bxs-folder"></i>
      </div>
    </div>
  </>
)}
              {/* Étape 1 - Informations personnelles */}
              {step === 1 && (
  <>
    <div className="inputs-box flex">
      <div className="input-box">
        <input
          type="text"
          name="CIN"
          placeholder="CIN"
          value={formData.CIN}
          onChange={handleChange}
          maxLength={8}
          minLength={8}
          required
        />   
        <i className="bx bxs-user"></i>
      </div>
      <div className="input-box">
        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <i className="bx bxs-user"></i>
      </div>
      <div className="input-box">
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <i className="bx bxs-user"></i>
      </div>
    </div>

    {errors.firstName && <span className="error-text">{errors.firstName}</span>}
    {errors.lastName && <span className="error-text">{errors.lastName}</span>}

    <div className="inputs-box flex">
      <div className="input-box">
        <input
          type="date"
          name="birthDate"
          placeholder="Date de naissance"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
        <i className="bx bxs-calendar"></i>
      </div>
      <div className="input-box">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <i className="bx bxs-envelope"></i>
      </div>
    </div>
    {errors.birthDate && <span className="error-text">{errors.birthDate}</span>}
    {errors.email && <span className="error-text">{errors.email}</span>}

    <div className="inputs-box flex">
      <div className="input-box">
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner le genre</option>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
        </select>
        <i className="bx bxs-user"></i>
      </div>
      <div className="input-box">
        <input
          type="text"
          name="phone"
          placeholder="Téléphone"
          value={formData.phone}
          onChange={handleChange}
          maxLength={8}
          minLength={8}
          required
        />
        <i className="bx bxs-phone"></i>
      </div>
    </div>
    {errors.gender && <span className="error-text">{errors.gender}</span>}
    {errors.phone && <span className="error-text">{errors.phone}</span>}

    <div className="input-box">
      <input
        type="file"
        name="image"
        onChange={handleChange}
      />
      <i className="bx bxs-image-add"></i>
    </div>

    <button type="button" className="btn" style={{ backgroundColor: "#0D4715", width: "50%" }}onClick={handleNext}>
      Next
    </button>
  </>
)}

              {/* Étape 2 - Sécurité */}
              {step === 2 && (
                <>
                  <div className="input-box">
                    <input
                      type="password"
                      name="password"
                      placeholder="Mot de passe"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <i className="bx bxs-lock-alt"></i>
                  </div>
                  <div className="input-box">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirmer le mot de passe"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <i className="bx bxs-lock-alt"></i>
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      name="verificationCode"
                      placeholder="Code de vérification"
                      value={formData.verificationCode}
                      onChange={handleChange}
                      required
                    />
                    <i className="bx bxs-key"></i>
                  </div>
                  <button type="button"style={{ backgroundColor: "#7494ec", width: "50%" }} className="btn" onClick={handleNext}>
                    Next
                  </button>
                </>
              )}

              {/* Étape 3 - Informations du projet */}
              {step === 3 && (
  <>
    <div className="input-box">
      <input
        type="text"
        name="project.name"
        placeholder="Project Name *"
        value={formData.project.name}
        onChange={handleChange}
        required
      />
      <i className="bx bxs-folder"></i>
      {errors.project?.name && <span className="error">{errors.project.name}</span>}
    </div>
    <div className="input-box">
      <input
        type="text"
        name="project.description"
        placeholder="Project Description *"
        value={formData.project.description}
        onChange={handleChange}
        minLength={5}
        required
      />
      <i className="bx bxs-edit"></i>
      {errors.project?.description && <span className="error">{errors.project.description}</span>}
    </div>
    <div className="input-box">
      <input
        type="date"
        name="project.startDate"
        placeholder="Start Date *"
        value={formData.project.startDate}
        onChange={handleChange}
        required
      />
      <i className="bx bxs-calendar"></i>
      {errors.project?.startDate && <span className="error">{errors.project.startDate}</span>}
    </div>
    <div className="input-box">
      <select
        name="project.status"
        value={formData.project.status}
        onChange={handleChange}
        required
      >
        <option value="">Select a Status *</option>
        <option value="planned">Planned</option>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>
      {errors.project?.status && <span className="error">{errors.project.status}</span>}
    </div>
    <button type="button" className="btn"style={{ backgroundColor: "#7494ec", width: "50%" }} onClick={handleNext}>
      Register
    </button>
  </>
)}
          
             {/* Step 4 Confirmation Message */}
  {step === 4 && (
    <div className="confirmation-message">
      <h2>Your account has been created successfully 🎉</h2>
    </div>
  )}
            </form>
          </div>
        ) : (
          <div className="form-box login">
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              <div className="input-box">
                <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <i className="bx bxs-user"></i>
              </div>
              <div className="input-box">
                <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <i className="bx bxs-lock-alt"></i>
              </div>
              <div className="forgot-password">
                <Link 
                  to="/auth/forget-password"
                  style={{ 
                    cursor: 'pointer',
                    color: '#0D4715',
                    fontSize: '0.9rem',
                    textDecoration: 'underline',
                    marginBottom: '15px',
                    display: 'inline-block'
                  }}
                >
                  Forget password !
                </Link>
              </div>
              
              <button type="submit" className="btn" disabled={loading} style={{ backgroundColor: "#0D4715", width: "50%" }}>
                {loading ? <IsLoading /> : "Login"}
              </button>
              
              {error && <p className="error">{error}</p>}
              <button 
    type="button" 
    className="btn" 
    onClick={handleFaceLogin}
    style={{ backgroundColor: "#0D4715", width: "50%" }}
  >
    Login with Face
  </button>
  <div className="/index">
                <Link 
                  to="/index"
                  style={{ 
                    cursor: 'pointer',
                    color: '#0D4715',
                    fontSize: '0.9rem',
                    textDecoration: 'underline',
                    marginBottom: '15px',
                    display: 'inline-block'
                  }}
                >
                  back to Home Page
                </Link>
              </div>
            </form>
          </div>
        )}

        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={() => setIsSignUp(true)}>Register</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>hey Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={() => setIsSignUp(false)}>Login</button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;