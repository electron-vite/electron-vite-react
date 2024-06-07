import {create} from 'zustand';

interface AuthState {
    user: any | null;
    setUser: (user: any) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

export default useAuthStore;
