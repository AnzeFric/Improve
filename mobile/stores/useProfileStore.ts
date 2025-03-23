import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import EncryptedStorage from "react-native-encrypted-storage";
import { Profile } from "@/interfaces/user";

interface ProfileStore {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
}

const useProfileStore = create(
  persist<ProfileStore>(
    (set) => ({
      profile: null,
      setProfile: async (profile: Profile | null) => {
        set({
          profile: profile,
        });
      },
    }),
    {
      name: "profileStore",
      storage: createJSONStorage(() => EncryptedStorage),
    }
  )
);

export default useProfileStore;
