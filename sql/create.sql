CREATE SCHEMA `scoreboard`;
USE `scoreboard`;
CREATE TABLE `scores`
(
    `idScores` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `score` INT UNSIGNED NOT NULL,
    `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`idScores`),
    -- UNIQUE INDEX `idScores_UNIQUE` (`idScores` ASC) VISIBLE
);