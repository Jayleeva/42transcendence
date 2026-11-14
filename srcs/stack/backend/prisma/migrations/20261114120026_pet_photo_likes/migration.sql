/*
  Warnings:

  - The values [PET_LIKE] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `PetLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('FRIEND_REQUEST', 'FRIEND_ACCEPTED', 'POST_LIKE', 'COMMENT_LIKE', 'PET_PHOTO_LIKE', 'COMMENT', 'MESSAGE', 'ACHIEVEMENT');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "public"."NotificationType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "PetLike" DROP CONSTRAINT "PetLike_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PetLike" DROP CONSTRAINT "PetLike_petId_fkey";

-- DropForeignKey
ALTER TABLE "PetLike" DROP CONSTRAINT "PetLike_petPhotoId_fkey";

-- DropTable
DROP TABLE "PetLike";

-- CreateTable
CREATE TABLE "PetPhotoLike" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" UUID NOT NULL,
    "petPhotoId" UUID NOT NULL,

    CONSTRAINT "PetPhotoLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PetPhotoLike_authorId_petPhotoId_key" ON "PetPhotoLike"("authorId", "petPhotoId");

-- AddForeignKey
ALTER TABLE "PetPhotoLike" ADD CONSTRAINT "PetPhotoLike_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetPhotoLike" ADD CONSTRAINT "PetPhotoLike_petPhotoId_fkey" FOREIGN KEY ("petPhotoId") REFERENCES "PetPhoto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
