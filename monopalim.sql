-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mar. 13 avr. 2021 à 22:58
-- Version du serveur :  5.7.17
-- Version de PHP :  5.6.30

CREATE DATABASE `monopalim`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `monopalim`
--

-- --------------------------------------------------------

--
-- Structure de la table `accounts`
--

CREATE TABLE `accounts` (
  `playerIndex` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(125) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `picture` varchar(255) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `accounts`
--

INSERT INTO `accounts` (`playerIndex`, `username`, `email`, `password`, `picture`) VALUES
(1, 'test', 'test@test.fr', '1234', 'mstile-150x150.png'),
(2, 'Marie', 'marie@marie.com', '123456', 'bitmoji-Marie.png'),
(3, 'Armand', 'armand@armand.fr', 'Jambon34', 'bitmoji-Armand.png'),
(4, 'Corentin', 'corentin@corentin.fr', 'azerty', 'bitmoji-Coco.png'),
(5, 'Noé', 'noe@noe.fr', 'WoW', 'bitmoji-Noe.png'),
(6, 'Adel', 'adel@adel.fr', 'password', 'bitmoji-Adel.png');

-- --------------------------------------------------------

--
-- Structure de la table `monopalimSave`
--

CREATE TABLE `monopalimSave` (
  `saveIndex` int(11) NOT NULL,
  `player1` varchar(50) DEFAULT NULL,
  `player2` varchar(50) DEFAULT NULL,
  `time` time NOT NULL,
  `gameState` tinyint(1) DEFAULT NULL,
  `nbTurns` int(2) DEFAULT NULL,
  `winner` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`playerIndex`),
  ADD UNIQUE KEY `Username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `monopalimSave`
--
ALTER TABLE `monopalimSave`
  ADD PRIMARY KEY (`saveIndex`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `playerIndex` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT pour la table `monopalimSave`
--
ALTER TABLE `monopalimSave`
  MODIFY `saveIndex` int(11) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
