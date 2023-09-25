"use client";

import { MdConstruction } from "react-icons/md";
import { NextPage } from "next";
import styles from "./responses.module.css";

const Responses: NextPage<{ params: { businessId: number } }> = ({
  params,
}) => {
  const getEmojiLabel = (emoji: string) => {
    switch (emoji) {
      case "terrible":
        return "😠 Terrible";
      case "bad":
        return "🙁 Bad";
      case "okey":
        return "🙂Okey";
      case "good":
        return "😄 Good";
      case "awesome":
        return "😍 Awesome";
      default:
        return emoji;
    }
  };

  return (
    <div className="">
      <div className={`${styles["dashboard-card"]}`}>
        <h3>Responses</h3>

        <p>This page is under construction</p>
        <MdConstruction />
        {/* {data.map((item) => {
          return (
            <div className={`${styles["flex-between"]}`} key={item._id}>
              <p>{getEmojiLabel(item.emoji_service)}</p>
              <p>
                {item.tags_order.map((item) => item.replace(/["\[\]]/g, ""))}
              </p>
              <p>{moment(item.createdAt).fromNow()}</p>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default Responses;
