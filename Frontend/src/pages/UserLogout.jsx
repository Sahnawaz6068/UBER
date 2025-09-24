import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem('WMF-Uniq');
  const navigate = useNavigate();
  console.log(import.meta.env.VITE_BASE_URL)
  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem('WMF-Uniq');
          navigate("/login");
        }
      } catch (error) {
        console.error("Logout failed", error);
        // fallback: clear token anyway
        localStorage.removeItem('WMF-Uniq');
        navigate("/login");
      }
    };

    logoutUser();
  }, [navigate, WMF-Uniq]);

  return <div>Logging out...</div>;
};

export default UserLogout;
