/*
  Warnings:

  - A unique constraint covering the columns `[userId,provider]` on the table `OAuthAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccount_userId_provider_key" ON "OAuthAccount"("userId", "provider");
