-- DropForeignKey
ALTER TABLE "SettlementStructure" DROP CONSTRAINT "SettlementStructure_settlementId_fkey";

-- AlterTable
ALTER TABLE "Structure" ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'https://via.placeholder.com/128x128';

-- AddForeignKey
ALTER TABLE "SettlementStructure" ADD CONSTRAINT "SettlementStructure_settlementId_fkey" FOREIGN KEY ("settlementId") REFERENCES "Settlement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
