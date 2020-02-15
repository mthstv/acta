export const TOKEN_KEY = "token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = async token => {
  await localStorage.setItem(TOKEN_KEY, token);
};
export const logout = async (history = "") => {
  await localStorage.removeItem(TOKEN_KEY);
  if(history) {
    history.push("/login");
  }
};