-- DropForeignKey
ALTER TABLE `Usuario` DROP FOREIGN KEY `Usuario_perfilId_fkey`;

-- AlterTable
ALTER TABLE `Perfil` MODIFY `nascimento` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_perfilId_fkey` FOREIGN KEY (`perfilId`) REFERENCES `Perfil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
