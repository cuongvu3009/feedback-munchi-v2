import axios from "axios";

export async function getFeedbackData(businessSlug: string | number) {
  try {
    const feedbacksResult = await axios.get(`/api/feedback/${businessSlug}`);
    const feedbacksData = feedbacksResult.data;
    return feedbacksData;
  } catch (error) {
    console.error("There was an error fetching feedbacks data", error);
  }
}
