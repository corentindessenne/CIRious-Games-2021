-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 17 mai 2021 à 15:38
-- Version du serveur :  8.0.21
-- Version de PHP : 7.3.21

CREATE DATABASE `monopalim`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `monopalim`
--

-- --------------------------------------------------------

--
-- Structure de la table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `playerIndex` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) collate utf8_bin DEFAULT NULL,
  `email` varchar(125) DEFAULT NULL,
  `password` varchar(1000) DEFAULT NULL,
  `salt` varchar(1000) DEFAULT NULL,
  `picture` varchar(255) DEFAULT 'random.png',
  `height` int DEFAULT '162',
  `age` int DEFAULT '18',
  PRIMARY KEY (`playerIndex`),
  UNIQUE KEY `Username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `accounts`
--

INSERT INTO `accounts` (`playerIndex`, `username`, `email`, `password`, `salt`) VALUES
(1, 'Test', 'test@test.fr', '$2b$12$Rs5FAdNfCI5ndU22yhohuuvGGSrnQq887i.weBS93OB72odndEEe2', '$2b$12$Rs5FAdNfCI5ndU22yhohuu'),
(2, 'Adel', 'adel@adel.fr', '$2b$12$Rs5FAdNfCI5ndU22yhohuu1fv0.RvDsoDpJqNXbSfEfzEjSvNCsFS', '$2b$12$Rs5FAdNfCI5ndU22yhohuu'),
(3, 'Antoine', 'antoine@antoine.fr', '$2b$12$2xL993MsQWL6NeU8lsb3S.DIZ/267pyQCQ9/LYf3gbCyS7.07KYJ2', '$2b$12$2xL993MsQWL6NeU8lsb3S.'),
(4, 'Armand', 'armand@armand.fr', '$2b$12$zmd3r2uUosN2ysr9i0lSk.B1panIdDLd.HARikJPHkUBh9buZjoz.', '$2b$12$zmd3r2uUosN2ysr9i0lSk.'),
(5, 'Corentin', 'corentin@corentin.fr', '$2b$12$zDYqrSUxpIL6gJjPhu.dXuw5uZvHtG8QFpitfZxPgprvSIoLUy3ay', '$2b$12$zDYqrSUxpIL6gJjPhu.dXu'),
(6, 'Marie', 'marie@marie.fr', '$2b$12$oKKqY1cJqY.PzYd8EpRLSuONJN7blreAr2TzNA95gTbBtEtlfO3Ai', '$2b$12$oKKqY1cJqY.PzYd8EpRLSu'),
(7, 'Noé', 'noe@noe.fr', '$2b$12$pMJMyspESBehPvYdGfZXE.L4Y4YhR7Q3xz7XygE0Mx.9SWcK8jcPG', '$2b$12$pMJMyspESBehPvYdGfZXE.');

-- --------------------------------------------------------

--
-- Structure de la table `monopalimSave`
--

DROP TABLE IF EXISTS `monopalimsave`;
CREATE TABLE IF NOT EXISTS `monopalimsave` (
  `saveIndex` int NOT NULL AUTO_INCREMENT,
  `player1` varchar(50) DEFAULT NULL,
  `player2` varchar(50) DEFAULT NULL,
  `player3` varchar(50) DEFAULT NULL,
  `player4` varchar(50) DEFAULT NULL,
  `player5` varchar(50) DEFAULT NULL,
  `player6` varchar(50) DEFAULT NULL,
  `time` time NOT NULL,
  `gameState` varchar(50) DEFAULT NULL,
  `nbTurns` int DEFAULT NULL,
  `winner` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`saveIndex`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
COMMIT;

--
-- Déchargement des données de la table `monopalimsave`
--

INSERT INTO `monopalimsave` (`saveIndex`, `player1`, `player2`, `player3`, `player4`, `player5`, `player6`, `time`, `gameState`, `nbTurns`, `winner`) VALUES
(1, 'Adel', 'Antoine', 'Armand', 'Corentin', 'Marie', 'Noé', '1:17:23', 'terminé', '18', 'Armand'),
(2, 'Corentin', 'Adel', 'Antoine', 'Noé', '', '', '1:34:51', 'terminé', '16', 'Antoine'),
(3, 'Noé', 'Antoine', 'Adel', '', '', '', '0:15:12', 'abandon', '2', 'abandon'),
(4, 'Marie', 'Armand', 'Noé', 'Antoine', '', '', '1:13:21', 'terminé', '15', 'Marie'),
(5, 'Antoine', 'Noé', 'Armand', 'Marie', '', '', '1:19:45', 'terminé', '17', 'Armand'),
(6, 'Antoine', 'Corentin', 'Noé', 'Adel', 'Armand', 'Marie', '1:21:17', 'terminé', '13', 'Noé'),
(7, 'Armand', 'Noé', 'Antoine', 'Marie', 'Adel', 'Corentin', '1:46:24', 'terminé', '20', 'Corentin'),
(8, 'Corentin', 'Marie', 'Noé', 'Adel', 'Armand', 'Antoine', '1:38:51', 'terminé', '20', 'Adel'),
(9, 'Adel', 'Antoine', 'Armand', '', '', '', '0:34:59', 'abandon', '5', 'abandon'),
(10, 'Noé', 'Corentin', 'Adel', 'Antoine', '', '', '1:02:07', 'terminé', '16', 'Antoine'),
(11, 'Antoine', 'Armand', 'Corentin', 'Marie', '', '', '1:39:02', 'terminé', '20', 'Armand'),
(12, 'Antoine', 'Marie', 'Armand', 'Corentin', '', '', '1:17:23', 'terminé', '17', 'Marie');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

