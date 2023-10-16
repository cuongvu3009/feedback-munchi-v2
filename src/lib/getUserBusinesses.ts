import { API_BASE_URL } from "@/utils/constantAPI";
import axios from "axios";

async function getUserBusinesses({
  userId,
  access_token,
}: {
  userId: number;
  access_token: string;
}) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}?params=businesses`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.result.businesses;
  } catch (error) {
    console.error("Error fetching user businesses:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export default getUserBusinesses;
