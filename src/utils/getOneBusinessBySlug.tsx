import { API_BASE_URL } from "@/utils/constantAPI";
import axios from "axios";

export async function getBusinessBySlug(businessSlug: string) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/business/${businessSlug}`
    );
    const businessesData = response.data.result;
    return businessesData;
  } catch (error) {
    console.error("There was an error fetching feedbacks data", error);
  }
}
