import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface TitleProps {
  isBack: boolean;
}

const Title: React.FC<TitleProps> = ({ isBack }) => {
  const router = useRouter();
  const t = useTranslations("Feedback");

  return (
    <div className="feedback-title">
      <button type="button" onClick={router.back}>
        {isBack ? <BiArrowBack size={25} /> : ""}
      </button>
      <h1>
        <b>{t("title")}</b>
      </h1>
      <p></p>
    </div>
  );
};

export default Title;
