-- CreateTable
CREATE TABLE "SettlementStructureConstructionQueue" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3),
    "paused" TIMESTAMP(3),
    "duration" INTEGER NOT NULL,
    "settlementId" TEXT,
    "structureId" TEXT,

    CONSTRAINT "SettlementStructureConstructionQueue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SettlementStructureConstructionQueue" ADD CONSTRAINT "SettlementStructureConstructionQueue_structureId_fkey" FOREIGN KEY ("structureId") REFERENCES "Structure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SettlementStructureConstructionQueue" ADD CONSTRAINT "SettlementStructureConstructionQueue_settlementId_fkey" FOREIGN KEY ("settlementId") REFERENCES "Settlement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
