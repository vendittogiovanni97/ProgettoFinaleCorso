/*
  Warnings:

  - You are about to drop the column `type` on the `channels` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `channels` DROP COLUMN `type`,
    ADD COLUMN `text` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `video` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `voice` BOOLEAN NOT NULL DEFAULT false;
