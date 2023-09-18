import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  const {
    businessSlug,
    emojiService,
    commentService,
    serviceTags,
    emojiOrder,
    commentOrder,
    orderTags,
  } = await req.json();

  try {
    // Create the feedback entry without serviceTags and orderTags
    const addFeedback = await prisma.feedback.create({
      data: {
        businessSlug,
        commentService,
        emojiService,
        emojiOrder,
        commentOrder,
      },
    });

    // Create ServiceTag records and associate them with the feedback entry
    const feedbackId = addFeedback.id;
    // Create ServiceTag and OrderTag records concurrently and associate them with the feedback entry
    await Promise.all([
      prisma.serviceTag.create({
        data: {
          value: serviceTags,
          feedbacks: {
            connect: {
              id: feedbackId,
            },
          },
        },
      }),
      prisma.orderTag.create({
        data: {
          value: orderTags,
          feedbacks: {
            connect: {
              id: feedbackId,
            },
          },
        },
      }),
    ]);

    return Response.json("Feedback created");
  } catch (error) {
    console.error("Error creating feedback:", error);
    return Response.json("Error creating feedback" + error);
  }
}
