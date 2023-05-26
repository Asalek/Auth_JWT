/*
  Warnings:

  - You are about to drop the `BookMark` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookMark" DROP CONSTRAINT "BookMark_userId_fkey";

-- DropTable
DROP TABLE "BookMark";

-- CreateTable
CREATE TABLE "priiiiiiz" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "priiiiiiz_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "priiiiiiz" ADD CONSTRAINT "priiiiiiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "asalek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
