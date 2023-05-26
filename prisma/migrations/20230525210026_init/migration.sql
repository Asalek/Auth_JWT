/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `BookMark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookMark" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "asalek" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hashed_PASSWD" TEXT NOT NULL,
    "fname" TEXT,
    "lname" TEXT,

    CONSTRAINT "asalek_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "asalek_email_key" ON "asalek"("email");

-- AddForeignKey
ALTER TABLE "BookMark" ADD CONSTRAINT "BookMark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "asalek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
