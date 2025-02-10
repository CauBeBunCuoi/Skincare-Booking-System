import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : false
  );
  const [userData, setUserData] = useState(false);

  const getDoctorsData = () => {};

  const loadUserProfileData = () => {};

  const value = {
    doctors,
    getDoctorsData,
    accessToken,
    setAccessToken,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
