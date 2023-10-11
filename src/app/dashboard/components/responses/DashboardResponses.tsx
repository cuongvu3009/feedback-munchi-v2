import Button from "@/components/shared/Button";
import { Feedback } from "@/types/feedback.types";
import React from "react";
import Spinner from "@/components/shared/Spinner";
import { getFetcher } from "@/utils/fetcher";
import moment from "moment";
import styles from "./dashboardResponses.module.css";
import { useRouter } from "next/navigation";
import useSWR from "swr";

interface DashboardResponseProps {
  businessSlug: string;
}

const DashboardResponses: React.FC<DashboardResponseProps> = ({
  businessSlug,
}) => {
  const router = useRouter();
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const { data, error, isValidating } = useSWR(
    `/api/feedback/${businessSlug}?page=${page}&itemsPerPage=${itemsPerPage}`,
    getFetcher
  );

  const getEmojiLabel = (emoji: string) => {
    switch (emoji) {
      case "terrible":
        return "Terrible 😠";
      case "bad":
        return "Bad 🙁";
      case "okey":
        return "Okey 🙂";
      case "good":
        return "Good 😄";
      case "awesome":
        return "Awesome 😍";
      default:
        return emoji;
    }
  };

  const handleBtnClick = () => {
    router.push(`/dashboard/admin/responses/`);
  };

  if (error) {
    console.log(error);
    return <div>Error loading reponses data!</div>;
  }

  if (isValidating) {
    return <Spinner />;
  }

  return (
    <div className={`${styles["dashboard-card"]}`}>
      <h3>Responses</h3>

      {data?.feedbacks?.map((item: Feedback) => (
        <div
          className={styles["flex-between"]}
          key={item.id + item.businessSlug + item.createdAt}
        >
          <p>{getEmojiLabel(item.emoji)}</p>
          <p>{moment(item.createdAt).fromNow()}</p>
        </div>
      ))}

      <Button btnText="See All" version="secondary" onClick={handleBtnClick} />
    </div>
  );
};

export default DashboardResponses;
