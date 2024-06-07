import { create } from 'zustand';

interface AuthState {
  token: string | null;
  menus: any[];
  setUser: (token: string) => void;
  fetchMenus: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  menus: [],
  setUser: (token) => set({ token }),
  fetchMenus: async () => {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch('http://180.191.51.65:9130/api/menus', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch menus');
    }

    const data = await response.json();
    set({ menus: data.payload });
  },
}));

const getToken = () => {
  try {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) {
      return null;
    }
    const token = JSON.parse(tokenString);
    return token?.BearerToken || null;
  } catch (error) {
    console.error('Error parsing token from localStorage', error);
    return null;
  }
};


export default useAuthStore;
