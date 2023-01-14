import { TOKEN_KEY } from "../config/const";

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const tokenHelper = {
  getToken,
  saveToken,
  removeToken,
};

export default tokenHelper;
