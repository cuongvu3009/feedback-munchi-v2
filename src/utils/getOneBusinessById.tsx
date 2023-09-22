import { API_BASE_URL } from "@/utils/constantAPI";
import axios from "axios";

export async function getBusinessById(businessId: number) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/business/${businessId}?params=logo,slug,name`
    );
    const businessesData = response.data.result;
    return businessesData;
  } catch (error) {
    console.error("There was an error fetching feedbacks data", error);
  }
}
