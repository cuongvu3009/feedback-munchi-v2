import prisma from "@/lib/prisma";

export interface Feedback {
  id: number;
  emoji: any;
  businessSlug: string;
  comment: string;
  tags: string;
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
      orderBy: {
        createdAt: "desc",
      },
    });

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
          return 0; // Handle unknown values as needed
      }
    };

    const calculateAverageScore = (data: Feedback[]) => {
      let totalScore = 0;
      let totalCount = 0;

      if (data && data.length > 0) {
        // Check if data is defined and not empty
        data.forEach((entry) => {
          const emoji = entry.emoji;
          const score = mapEmojiToScore(emoji); // Implement your mapping function

          totalScore += score;
          totalCount++;
        });
      }

      if (totalCount === 0) {
        return 0; // Avoid division by zero
      }

      return (totalScore / totalCount).toFixed(1); // Calculate and round to one decimal place
    };

    const averageScore = calculateAverageScore(feedbacks as never);

    return Response.json({
      feedbacks,
      averageScore,
    });
  } catch (error) {
    console.error("Error get feedbacks:", error);
    return Response.json(error);
  }
}
