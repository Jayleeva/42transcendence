/*
  Warnings:

  - Added the required column `petId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "photo" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image" TEXT,
ADD COLUMN     "petId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "password" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
