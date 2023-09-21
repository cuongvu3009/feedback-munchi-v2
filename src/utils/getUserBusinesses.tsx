import { API_BASE_URL } from "@/utils/constantAPI";
import axios from "axios";

async function getUserBusinesses() {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    throw new Error("User data not found in local storage");
  }
  try {
    const user = JSON.parse(storedUser);
    const userId = user.id;
    const access_token = user.session.access_token;

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
