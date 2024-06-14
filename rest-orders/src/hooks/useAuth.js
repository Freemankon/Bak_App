import { getAccessToken, getRefreshToken } from "helpers/tokenService";

export const useAuth = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  const isLoggedIn = Boolean(accessToken);

  return {
    isLoggedIn,
    accessToken,
    refreshToken,
  };
};
