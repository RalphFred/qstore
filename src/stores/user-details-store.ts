import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface UserDetailsStore {
  userDetails: UserDetails;
  updateUserDetails: (details: Partial<UserDetails>) => void;
  setUserDetails: (details: UserDetails) => void;
  clearUserDetails: () => void;
  hasUserDetails: () => boolean;
}

const defaultUserDetails: UserDetails = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

export const useUserDetailsStore = create<UserDetailsStore>()(
  persist(
    (set, get) => ({
      userDetails: defaultUserDetails,
      
      updateUserDetails: (details: Partial<UserDetails>) => 
        set((state) => ({
          userDetails: { ...state.userDetails, ...details }
        })),
      
      setUserDetails: (details: UserDetails) =>
        set({ userDetails: details }),
      
      clearUserDetails: () =>
        set({ userDetails: defaultUserDetails }),
      
      hasUserDetails: () => {
        const { userDetails } = get();
        return !!(userDetails.name && userDetails.email && userDetails.phone && userDetails.address);
      },
    }),
    {
      name: 'user-details-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 