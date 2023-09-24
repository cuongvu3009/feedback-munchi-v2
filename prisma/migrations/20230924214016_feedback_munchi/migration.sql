-- CreateEnum
CREATE TYPE "Type" AS ENUM ('SERVICE', 'ORDER');

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "emoji" TEXT NOT NULL,
    "businessSlug" TEXT NOT NULL,
    "comment" TEXT,
    "tags" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);
