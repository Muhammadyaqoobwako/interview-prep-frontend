import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "./userContextInstance";

export { UserContext };

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const updateUser = (userData) => {
    setUser(userData);
    if (userData && userData.token) {
      localStorage.setItem("authToken", userData.token);
    }
    setLoading(false);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("authToken");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    if (user) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
