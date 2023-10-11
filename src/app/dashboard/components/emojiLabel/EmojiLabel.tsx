import AwesomeSVG from "@/utils/emoji-svg/AwesomeSVG";
import BadSVG from "@/utils/emoji-svg/BadSVG";
import { EmojiLabelProps } from "@/types/dashboard.types";
import GoodSVG from "@/utils/emoji-svg/GoodSVG";
import OkeySVG from "@/utils/emoji-svg/OkeySVG";
import React from "react";
import TerribleSVG from "@/utils/emoji-svg/TerribleSVG";
import styles from "./emojiLabel.module.css";

const EmojiLabel: React.FC<EmojiLabelProps> = ({ emoji }) => {
  switch (emoji) {
    case "terrible":
      return (
        <span className={styles.emojiContainer}>
          <div className={styles.emoji}>
            <TerribleSVG size={30} />
          </div>
          <p>Terrible</p>
        </span>
      );
    case "bad":
      return (
        <span className={styles.emojiContainer}>
          <div className={styles.emoji}>
            <BadSVG size={30} />
          </div>
          <p>Bad</p>
        </span>
      );
    case "okey":
      return (
        <span className={styles.emojiContainer}>
          <div className={styles.emoji}>
            <OkeySVG size={30} />
          </div>
          <p>Okey</p>
        </span>
      );
    case "good":
      return (
        <span className={styles.emojiContainer}>
          <div className={styles.emoji}>
            <GoodSVG size={30} />
          </div>
          <p>Good</p>
        </span>
      );
    case "awesome":
      return (
        <span className={styles.emojiContainer}>
          <div className={styles.emoji}>
            <AwesomeSVG size={30} />
          </div>
          <p>Awesome</p>
        </span>
      );
    default:
      return emoji;
  }
};

export default EmojiLabel;
