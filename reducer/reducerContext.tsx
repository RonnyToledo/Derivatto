import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { supabase } from "@/lib/supbase";

// Define the shape of the state
interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

// Define action types
type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: any }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };

// Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload, loading: false, error: null };
    case "LOGIN_FAILURE":
      return { ...state, user: null, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...state, user: null, loading: false, error: null };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | null>(null);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Login function
export const login = async (
  dispatch: React.Dispatch<AuthAction>,
  email: string,
  password: string
) => {
  dispatch({ type: "SET_LOADING", payload: true });
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.message });
  } else {
    dispatch({ type: "LOGIN_SUCCESS", payload: user });
  }
};

// Logout function
export const logout = async (dispatch: React.Dispatch<AuthAction>) => {
  await supabase.auth.signOut();
  dispatch({ type: "LOGOUT" });
};
