/*
  Warnings:

  - You are about to drop the column `photo` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `petId` on the `Post` table. All the data in the column will be lost.
  - Changed the type of `species` on the `Pet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Species" AS ENUM ('DOG', 'CAT', 'BUNNY', 'HAMSTER', 'GUINEAPIG', 'MOUSE', 'RAT', 'FISH', 'LIZARD', 'SNAKE', 'TURTLE', 'BIRD');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_petId_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "photo",
ADD COLUMN     "avatar" TEXT,
DROP COLUMN "species",
ADD COLUMN     "species" "Species" NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "petId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PetPhoto" (
    "id" UUID NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petId" UUID NOT NULL,

    CONSTRAINT "PetPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostImage" (
    "id" UUID NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" UUID NOT NULL,

    CONSTRAINT "PostImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" UUID NOT NULL,
    "postId" UUID NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostLike" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" UUID NOT NULL,
    "postId" UUID NOT NULL,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentLike" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" UUID NOT NULL,
    "commentId" UUID NOT NULL,

    CONSTRAINT "CommentLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetLike" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" UUID NOT NULL,
    "petId" UUID NOT NULL,
    "petPhotoId" UUID,

    CONSTRAINT "PetLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PetToPost" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_PetToPost_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostLike_authorId_postId_key" ON "PostLike"("authorId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentLike_authorId_commentId_key" ON "CommentLike"("authorId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "PetLike_authorId_petId_key" ON "PetLike"("authorId", "petId");

-- CreateIndex
CREATE INDEX "_PetToPost_B_index" ON "_PetToPost"("B");

-- AddForeignKey
ALTER TABLE "PetPhoto" ADD CONSTRAINT "PetPhoto_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetLike" ADD CONSTRAINT "PetLike_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetLike" ADD CONSTRAINT "PetLike_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetLike" ADD CONSTRAINT "PetLike_petPhotoId_fkey" FOREIGN KEY ("petPhotoId") REFERENCES "PetPhoto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetToPost" ADD CONSTRAINT "_PetToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetToPost" ADD CONSTRAINT "_PetToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
