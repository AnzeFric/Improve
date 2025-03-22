import useProfileStore from "@/stores/useProfileStore";
import useAuthStore from "@/stores/useAuthStore";
import { Profile } from "@/interfaces/user";

export function useProfile() {
  const { userId } = useAuthStore();
  const { profile, setProfile } = useProfileStore();

  function saveProfile(age: number, weight: number, height: number) {
    try {
      console.log("Profile save");
    } catch (error) {
      console.error("Error while saving profile:", error);
    }
  }

  return {
    saveProfile,
  };
}
