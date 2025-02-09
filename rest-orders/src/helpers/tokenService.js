export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const setRefreshToken = (token) => {
  localStorage.setItem("refreshToken", token);
};
