-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_topicId_topicVersion_fkey";

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_topicId_topicVersion_fkey" FOREIGN KEY ("topicId", "topicVersion") REFERENCES "Topic"("id", "version") ON DELETE CASCADE ON UPDATE CASCADE;
