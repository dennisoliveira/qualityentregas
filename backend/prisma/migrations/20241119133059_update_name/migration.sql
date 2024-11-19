/*
  Warnings:

  - Made the column `Nome` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Customer` MODIFY `Nome` VARCHAR(191) NOT NULL;
