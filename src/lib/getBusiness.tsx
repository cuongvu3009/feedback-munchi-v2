import { API_BASE_URL } from "@/utils/constantAPI";
import axios from "axios";

export async function getBusiness(businessSlug: string | number) {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser!);
  const access_token = user.session.access_token;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/business/${businessSlug}?mode=dashboard`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const businessesData = response.data.result;
    return businessesData;
  } catch (error) {
    console.error("There was an error fetching feedbacks data", error);
  }
}
