import useProfileStore from "@/stores/useProfileStore";
import useAuthStore from "@/stores/useAuthStore";
import Config from "react-native-config";
import { Profile } from "@/interfaces/user";

export function useProfile() {
  const { userId } = useAuthStore();
  const { setProfile } = useProfileStore();

  const handleSaveProfile = async (
    age: number,
    weight: number,
    height: number
  ) => {
    try {
      const newProfile: Profile = {
        userId: userId,
        age: age,
        weight: weight,
        height: height,
      };

      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/profile/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProfile),
        }
      );

      if (response.ok) {
        setProfile(newProfile);
        return true;
      }
    } catch (error) {
      console.error("Error while saving profile:", error);
      return false;
    }
  };

  const handleGetProfile = async () => {
    try {
      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/profile/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const profile = await response.json();
        setProfile(profile);
        return profile;
      } else {
        console.log("Failed to fetch profile:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error while fetching profile:", error);
      return null;
    }
  };

  return {
    handleSaveProfile,
    handleGetProfile,
  };
}
