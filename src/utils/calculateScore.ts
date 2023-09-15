// import { FeedbackCount } from "../types/feedback.types";

// export const calculateAverageScore = (feedbackCount: FeedbackCount[]) => {
//   const scores: { [key: string]: number } = {
//     awesome: 5,
//     good: 4,
//     okey: 3,
//     bad: 2,
//     terrible: 1,
//   };

//   const validFeedbacks = feedbackCount.filter(
//     (feedback) => feedback.type !== "total"
//   );
//   const weightedSum = validFeedbacks.reduce((acc, feedback) => {
//     return acc + (feedback.count ?? 0) * (scores[feedback.type] || 0);
//   }, 0);

//   const totalCount = validFeedbacks.reduce((acc, feedback) => {
//     return acc + (feedback.count ?? 0);
//   }, 0);

//   const averageScore = weightedSum / totalCount;
//   const roundedAverageScore = Math.round(averageScore * 10) / 10;

//   return roundedAverageScore;
// };
