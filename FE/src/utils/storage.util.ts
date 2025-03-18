// Lấy token từ localStorage
const getAuthTokenFromPersistLocalStorage = (): string | null => {
  try {
    const persistedState = JSON.parse(localStorage.getItem("persist:root"));
    if (persistedState && persistedState.auth) {
      const auth = JSON.parse(persistedState.auth);
      if (auth.token) {
        return auth.token;
      }
    }
  } catch (error) {
    console.error("Error getting token from local storage:", error);
  }
  return null;
};

// Lấy thông tin người dùng từ localStorage
const getAuthUserFromPersistLocalStorage = (): any | null => {
  try {
    const persistedState = JSON.parse(localStorage.getItem("persist:root"));
    if (persistedState && persistedState.auth) {
      const auth = JSON.parse(persistedState.auth);
      if (auth.user) {
        return auth.user;
      }
    }
  } catch (error) {
    console.error("Error getting user from local storage:", error);
  }
  return null;
};

const LocalStorageUtil = {
  getAuthTokenFromPersistLocalStorage,
  getAuthUserFromPersistLocalStorage,
};

export { LocalStorageUtil };
