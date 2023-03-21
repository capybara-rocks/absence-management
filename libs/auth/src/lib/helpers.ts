export const storeRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refresh-token', refreshToken);
};

export const retrieveRefreshToken = () => {
  return localStorage.getItem('refresh-token');
};

export const clearRefreshToken = () => {
  return localStorage.removeItem('refresh-token');
};

export const avatarUrl = (avatar: string) => {
  return `${import.meta.env.VITE_BASE_API_URL}/${avatar}`;
};

export const roleNumToString = (role = 2) => {
  switch (role) {
    case 0:
      return 'admin';
    case 1:
      return 'manager';
    default:
      return 'member';
  }
};
