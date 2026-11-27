-- DropIndex
DROP INDEX "Friendship_requesterId_receiverId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_unique_pair_idx"
ON "Friendship" (
    LEAST("requesterId", "receiverId"),
    GREATEST("requesterId", "receiverId")
);