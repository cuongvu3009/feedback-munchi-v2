import { API_BASE_URL } from "@/utils/constantAPI";
import { Ordering } from "ordering-api-sdk";

// Instantiate Ordering
const ordering = new Ordering({
  // Configure SDK options here (e.g., URL and project)
  url: API_BASE_URL, // Specify the API URL if needed
  project: "development", // Specify the project if needed
});

// Export the configured instance of the Ordering SDK
export default ordering;
