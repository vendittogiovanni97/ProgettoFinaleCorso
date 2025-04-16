/*
  Warnings:

  - You are about to drop the column `text` on the `channels` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `channels` table. All the data in the column will be lost.
  - You are about to drop the column `voice` on the `channels` table. All the data in the column will be lost.
  - Added the required column `type` to the `channels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `channels` DROP COLUMN `text`,
    DROP COLUMN `video`,
    DROP COLUMN `voice`,
    ADD COLUMN `type` ENUM('TEXT', 'VOICE', 'VIDEO') NOT NULL;
