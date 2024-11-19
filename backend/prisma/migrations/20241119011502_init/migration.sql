-- CreateTable
CREATE TABLE `Customer` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `DataHoraCadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Codigo` VARCHAR(191) NULL,
    `Nome` VARCHAR(191) NULL,
    `CPF_CNPJ` VARCHAR(191) NULL,
    `CEP` INTEGER NULL,
    `Logradouro` VARCHAR(191) NULL,
    `Endereco` VARCHAR(191) NULL,
    `Numero` VARCHAR(191) NULL,
    `Bairro` VARCHAR(191) NULL,
    `Cidade` VARCHAR(191) NULL,
    `UF` VARCHAR(191) NULL,
    `Complemento` VARCHAR(191) NULL,
    `Fone` VARCHAR(191) NULL,
    `LimiteCredito` DOUBLE NULL,
    `Validade` DATETIME(3) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `State` (
    `Nome` VARCHAR(191) NOT NULL,
    `Sigla` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `State_Sigla_key`(`Sigla`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
