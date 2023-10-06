-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "emoji" TEXT NOT NULL,
    "businessSlug" TEXT NOT NULL,
    "comment" TEXT,
    "tags" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "businessSlug" TEXT NOT NULL,
    "paymentAmount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
