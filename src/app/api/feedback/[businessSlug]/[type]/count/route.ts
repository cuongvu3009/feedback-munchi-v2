import prisma from "@/lib/prisma";

export interface Feedback {
  id: number;
  emoji: string;
  businessSlug: string;
  comment: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  type: string;
}

export async function GET(
  req: Request,
  { params }: { params: { businessSlug: string; type: string } }
) {
  const businessSlug = params.businessSlug;
  const type = params.type;
  try {
    const feedbacks = await prisma.feedback.findMany({
      where: {
        businessSlug,
        type,
      },
    });

    const emojiCounts: { [emoji: string]: number } = {
      terrible: 0,
      bad: 0,
      okey: 0,
      good: 0,
      awesome: 0,
    };

    let totalScore = 0;

    feedbacks.forEach((entry) => {
      const emoji = entry.emoji;
      const score = mapEmojiToScore(emoji);

      totalScore += score;
      emojiCounts[emoji]++;
    });

    const totalFeedback = feedbacks.length;

    const averageScore =
      totalFeedback === 0 ? 0 : (totalScore / totalFeedback).toFixed(1);

    return Response.json({
      emojiCounts,
      averageScore,
      totalFeedback,
    });
  } catch (error) {
    console.error("Error get feedbacks:", error);
    return Response.json(error);
  }
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
