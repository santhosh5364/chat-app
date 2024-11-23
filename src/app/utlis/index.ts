const userId = "user_socket_id";
const userName = "user_name";

export const getUserId = () => {
  return sessionStorage.getItem(userId);
};

export const setUserId = (id: string) => {
  sessionStorage.setItem(userId, id);
};

export const removeUserId = () => {
  sessionStorage.removeItem(userId);
};

export const isUserIdSet = () => {
  return sessionStorage.exists(userId);
};

export const getUserName = () => {
  return sessionStorage.getItem(userName);
};

export const setUserName = (name: string) => {
  sessionStorage.setItem(userName, name);
};
