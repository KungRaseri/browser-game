/*
  Warnings:

  - You are about to drop the column `resourceId` on the `StructureModifier` table. All the data in the column will be lost.
  - You are about to drop the `PlotResource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[settlementStorageId]` on the table `Settlement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[structureRequirementsId]` on the table `SettlementStructure` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `settlementStorageId` to the `Settlement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `structureRequirementsId` to the `SettlementStructure` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Plot" DROP CONSTRAINT "Plot_tileId_fkey";

-- DropForeignKey
ALTER TABLE "PlotResource" DROP CONSTRAINT "PlotResource_plotId_fkey";

-- DropForeignKey
ALTER TABLE "PlotResource" DROP CONSTRAINT "PlotResource_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_accountId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileServerData" DROP CONSTRAINT "ProfileServerData_profileId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileServerData" DROP CONSTRAINT "ProfileServerData_serverId_fkey";

-- DropForeignKey
ALTER TABLE "Region" DROP CONSTRAINT "Region_worldId_fkey";

-- DropForeignKey
ALTER TABLE "Settlement" DROP CONSTRAINT "Settlement_playerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Settlement" DROP CONSTRAINT "Settlement_plotId_fkey";

-- DropForeignKey
ALTER TABLE "SettlementStructure" DROP CONSTRAINT "SettlementStructure_settlementId_fkey";

-- DropForeignKey
ALTER TABLE "StructureModifier" DROP CONSTRAINT "StructureModifier_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "StructureModifier" DROP CONSTRAINT "StructureModifier_settlementStructureId_fkey";

-- DropForeignKey
ALTER TABLE "Tile" DROP CONSTRAINT "Tile_regionId_fkey";

-- DropForeignKey
ALTER TABLE "World" DROP CONSTRAINT "World_serverId_fkey";

-- AlterTable
ALTER TABLE "Biome" ADD COLUMN     "foodModifier" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "oreModifier" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "plotAreaMax" INTEGER NOT NULL DEFAULT 50,
ADD COLUMN     "plotAreaMin" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "plotsMax" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "plotsMin" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "solarModifier" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "stoneModifier" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "waterModifier" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "windModifier" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "woodModifier" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Plot" ADD COLUMN     "area" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "food" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "ore" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "solar" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "stone" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "water" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "wind" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "wood" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Settlement" ADD COLUMN     "settlementStorageId" TEXT NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'Home Settlment';

-- AlterTable
ALTER TABLE "SettlementStructure" ADD COLUMN     "structureRequirementsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StructureModifier" DROP COLUMN "resourceId";

-- DropTable
DROP TABLE "PlotResource";

-- DropTable
DROP TABLE "Resource";

-- CreateTable
CREATE TABLE "SettlementStorage" (
    "id" TEXT NOT NULL,
    "food" INTEGER NOT NULL,
    "water" INTEGER NOT NULL,
    "wood" INTEGER NOT NULL,
    "stone" INTEGER NOT NULL,
    "ore" INTEGER NOT NULL,

    CONSTRAINT "SettlementStorage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StructureRequirements" (
    "id" TEXT NOT NULL,
    "area" INTEGER NOT NULL DEFAULT 1,
    "solar" INTEGER NOT NULL DEFAULT 1,
    "wind" INTEGER NOT NULL DEFAULT 1,
    "food" INTEGER NOT NULL DEFAULT 1,
    "water" INTEGER NOT NULL DEFAULT 1,
    "wood" INTEGER NOT NULL DEFAULT 1,
    "stone" INTEGER NOT NULL DEFAULT 1,
    "ore" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "StructureRequirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settlement_settlementStorageId_key" ON "Settlement"("settlementStorageId");

-- CreateIndex
CREATE UNIQUE INDEX "SettlementStructure_structureRequirementsId_key" ON "SettlementStructure"("structureRequirementsId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileServerData" ADD CONSTRAINT "ProfileServerData_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileServerData" ADD CONSTRAINT "ProfileServerData_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "World" ADD CONSTRAINT "World_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tile" ADD CONSTRAINT "Tile_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plot" ADD CONSTRAINT "Plot_tileId_fkey" FOREIGN KEY ("tileId") REFERENCES "Tile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_settlementStorageId_fkey" FOREIGN KEY ("settlementStorageId") REFERENCES "SettlementStorage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "Plot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_playerProfileId_fkey" FOREIGN KEY ("playerProfileId") REFERENCES "ProfileServerData"("profileId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SettlementStructure" ADD CONSTRAINT "SettlementStructure_structureRequirementsId_fkey" FOREIGN KEY ("structureRequirementsId") REFERENCES "StructureRequirements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SettlementStructure" ADD CONSTRAINT "SettlementStructure_settlementId_fkey" FOREIGN KEY ("settlementId") REFERENCES "Settlement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StructureModifier" ADD CONSTRAINT "StructureModifier_settlementStructureId_fkey" FOREIGN KEY ("settlementStructureId") REFERENCES "SettlementStructure"("id") ON DELETE CASCADE ON UPDATE CASCADE;


/*
  Warnings:

  - You are about to drop the column `settlementStorageId` on the `Settlement` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `SettlementStructure` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `SettlementStructure` table. All the data in the column will be lost.
  - You are about to drop the column `structureRequirementsId` on the `SettlementStructure` table. All the data in the column will be lost.
  - You are about to drop the `SettlementStorage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StructureModifier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StructureRequirements` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `ProfileServerData` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `level` to the `SettlementStructure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `structureId` to the `SettlementStructure` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Settlement" DROP CONSTRAINT "Settlement_settlementStorageId_fkey";

-- DropForeignKey
ALTER TABLE "SettlementStructure" DROP CONSTRAINT "SettlementStructure_settlementId_fkey";

-- DropForeignKey
ALTER TABLE "SettlementStructure" DROP CONSTRAINT "SettlementStructure_structureRequirementsId_fkey";

-- DropForeignKey
ALTER TABLE "StructureModifier" DROP CONSTRAINT "StructureModifier_settlementStructureId_fkey";

-- DropIndex
DROP INDEX "Settlement_settlementStorageId_key";

-- DropIndex
DROP INDEX "SettlementStructure_structureRequirementsId_key";

-- AlterTable
ALTER TABLE "ProfileServerData" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ProfileServerData_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Settlement" DROP COLUMN "settlementStorageId",
ALTER COLUMN "name" SET DEFAULT 'Home Settlement';

-- AlterTable
ALTER TABLE "SettlementStructure" DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "structureRequirementsId",
ADD COLUMN     "level" INTEGER NOT NULL,
ADD COLUMN     "structureId" TEXT NOT NULL;

-- DropTable
DROP TABLE "SettlementStorage";

-- DropTable
DROP TABLE "StructureModifier";

-- DropTable
DROP TABLE "StructureRequirements";

-- CreateTable
CREATE TABLE "Structure" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Structure_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SettlementStructure" ADD CONSTRAINT "SettlementStructure_settlementId_fkey" FOREIGN KEY ("settlementId") REFERENCES "Settlement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SettlementStructure" ADD CONSTRAINT "SettlementStructure_structureId_fkey" FOREIGN KEY ("structureId") REFERENCES "Structure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Biome" ADD COLUMN     "plotAreaRange" INTEGER[] DEFAULT ARRAY[30, 50]::INTEGER[],
ADD COLUMN     "plotsRange" INTEGER[] DEFAULT ARRAY[1, 10]::INTEGER[],
ADD COLUMN     "precipitationRange" INTEGER[] DEFAULT ARRAY[0, 450]::INTEGER[],
ADD COLUMN     "temperatureRange" INTEGER[] DEFAULT ARRAY[-10, 32]::INTEGER[];
