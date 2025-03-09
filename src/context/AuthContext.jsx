import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, user: null, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return { user: null, token: null, loading: false, error: action.payload };
    case "LOGOUT":
      return { user: null, token: null, loading: false, error: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  // const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
  }, [state.user, state.token]);

const getCurrentUser = () => {
  if (state.user) {
    return {
      id: state.user._id,
      name: `${state.user.firstName} ${state.user.lastName}`,
      email: state.user.email,
      role: state.user.role,
      phone: state.user.phone,
      gender: state.user.gender,
      birthDate: state.user.birthDate,
      CIN: state.user.CIN,
      isDisabled: state.user.isDisabled,
      image: state.user.image ,
      project: state.user.project
        ? {
            name: state.user.project.name,
            description: state.user.project.description,
            startDate: state.user.project.startDate,
            status: state.user.project.status,
          }
        : null,
    };
  }
  return null;
};


  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    window.location.href = "/";
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        error: state.error,
        dispatch,
        getCurrentUser,
        Logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
