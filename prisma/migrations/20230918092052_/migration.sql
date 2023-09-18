/*
  Warnings:

  - You are about to drop the column `businessId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `feedbackId` on the `OrderTag` table. All the data in the column will be lost.
  - You are about to drop the column `feedbackId` on the `ServiceTag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[businessSlug]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `businessSlug` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessSlug` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_businessId_fkey";

-- DropForeignKey
ALTER TABLE "OrderTag" DROP CONSTRAINT "OrderTag_feedbackId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceTag" DROP CONSTRAINT "ServiceTag_feedbackId_fkey";

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "businessSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "businessId",
ADD COLUMN     "businessSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderTag" DROP COLUMN "feedbackId",
ALTER COLUMN "value" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ServiceTag" DROP COLUMN "feedbackId",
ALTER COLUMN "value" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_FeedbackToServiceTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FeedbackToOrderTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FeedbackToServiceTag_AB_unique" ON "_FeedbackToServiceTag"("A", "B");

-- CreateIndex
CREATE INDEX "_FeedbackToServiceTag_B_index" ON "_FeedbackToServiceTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FeedbackToOrderTag_AB_unique" ON "_FeedbackToOrderTag"("A", "B");

-- CreateIndex
CREATE INDEX "_FeedbackToOrderTag_B_index" ON "_FeedbackToOrderTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Business_businessSlug_key" ON "Business"("businessSlug");

-- AddForeignKey
ALTER TABLE "_FeedbackToServiceTag" ADD CONSTRAINT "_FeedbackToServiceTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedbackToServiceTag" ADD CONSTRAINT "_FeedbackToServiceTag_B_fkey" FOREIGN KEY ("B") REFERENCES "ServiceTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedbackToOrderTag" ADD CONSTRAINT "_FeedbackToOrderTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedbackToOrderTag" ADD CONSTRAINT "_FeedbackToOrderTag_B_fkey" FOREIGN KEY ("B") REFERENCES "OrderTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
