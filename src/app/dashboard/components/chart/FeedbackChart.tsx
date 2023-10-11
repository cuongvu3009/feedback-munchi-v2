import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Feedback } from "@/types/feedback.types";
import Spinner from "@/components/shared/Spinner";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { getFetcher } from "@/utils/fetcher";
import styles from "./feedbackChart.module.css";
import useSWR from "swr";

interface LineChartProps {
  businessSlug: string;
  type: string;
}

interface ChartData {
  [date: string]: {
    date: string;
    totalScore: number;
    count: number;
  };
}

const mapEmojiToScore = (emoji: string): number => {
  switch (emoji) {
    case "terrible":
      return 1;
    case "bad":
      return 2;
    case "okey":
      return 3;
    case "good":
      return 4;
    case "awesome":
      return 5;
    default:
      return 0;
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatAverageScore = (value: number): string => {
  return value.toFixed(1);
};

const LineChartComponent: React.FC<LineChartProps> = ({
  type,
  businessSlug,
}) => {
  const { data, error, isValidating } = useSWR(
    `/api/feedback/${businessSlug}/${type}`,
    getFetcher
  );

  // Handle loading state
  if (isValidating) {
    return <Spinner />;
  }

  // Handle error state
  if (error) {
    console.log(error);
    return <div>Error loading chart data!</div>;
  }

  // Check if data is available and has the 'feedbacks' property
  if (!data || !data.feedbacks) {
    return <div>No data available.</div>;
  }

  const chartData: ChartData = data.feedbacks.reduce(
    (acc: ChartData, entry: Feedback) => {
      const date = formatDate(entry.createdAt);
      if (!acc[date]) {
        acc[date] = { date, totalScore: 0, count: 0 };
      }
      const score = mapEmojiToScore(entry.emoji);
      acc[date].totalScore += score;
      acc[date].count += 1;
      return acc;
    },
    {} as ChartData
  );

  // Convert grouped data into an array and sort it by date
  const finalChartData = Object.values(chartData)
    .map((entry) => ({
      date: entry.date,
      averageScore: entry.totalScore / entry.count,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className={`${styles["chart-container"]}`}>
      <h4>{capitalizeFirstLetter(type)} feedback</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={finalChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
          {/* Adjust the domain and ticks */}
          <Tooltip formatter={(value: number) => formatAverageScore(value)} />
          <Line type="monotone" dataKey="averageScore" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
