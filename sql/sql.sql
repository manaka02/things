-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Sam 24 Novembre 2018 à 00:29
-- Version du serveur :  5.7.11
-- Version de PHP :  7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `hackathon`
--

-- --------------------------------------------------------

--
-- Structure de la table `joindre`
--

CREATE TABLE `joindre` (
  `joindreid` int(11) NOT NULL,
  `trajetid` int(11) NOT NULL,
  `userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `joindre`
  ADD `statut` int(11) NOT NULL;

-- --------------------------------------------------------

--
-- Structure de la table `point`
--

CREATE TABLE `point` (
  `pointid` int(11) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `suburb` varchar(250) NOT NULL,
  `city` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `point`
--

INSERT INTO `point` (`pointid`, `latitude`, `longitude`, `suburb`, `city`) VALUES
(1, -18.90304, 47.5127808, '67ha Est', 'Antananarivo'),
(7, -18.939703, 47.522127, 'Ankadimbahoaka', 'Antananarivo'),
(8, -18.94363, 47.524534, 'Ankadimbahoaka', 'Antananarivo'),
(9, -18.936049, 47.515589, 'Namontana', 'Antananarivo'),
(10, -18.936067, 47.524689, 'Soanierana', 'Antananarivo'),
(11, -18.926708, 47.52777, 'Tsimbazaza', 'Antananarivo'),
(12, -18.921302, 47.527847, 'Amparibe', 'Antananarivo'),
(13, -18.917893, 47.528545, 'Andohalo', 'Antananarivo'),
(14, -18.916213, 47.527601, 'Amparibe', 'Antananarivo'),
(15, -18.918027, 47.52232, 'Mahamasina', 'Antananarivo'),
(16, -18.918032, 47.521907, 'Mahamasina', 'Antananarivo'),
(17, -18.915303, 47.518472, 'Anosy', 'Antananarivo'),
(18, -18.909829, 47.527266, 'Analakely', 'Antananarivo'),
(19, -18.908568, 47.525909, 'Analakely', 'Antananarivo'),
(20, -18.906901, 47.525659, 'Analakely', 'Antananarivo'),
(21, -18.970876, 47.529961, 'Malaza', 'Antananarivo'),
(22, -18.979764, 47.532797, 'Andoharanofotsy', 'Antananarivo');

-- --------------------------------------------------------

--
-- Structure de la table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `task` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `tasks`
--

INSERT INTO `tasks` (`id`, `task`, `status`, `created_at`) VALUES
(1, 'Find bugs', 1, '2016-04-10 23:50:40'),
(2, 'Review code', 1, '2016-04-10 23:50:40'),
(3, 'Fix bugs', 1, '2016-04-10 23:50:40'),
(4, 'Refactor Code', 1, '2016-04-10 23:50:40'),
(5, 'Push to prod', 1, '2016-04-10 23:50:50');

-- --------------------------------------------------------

--
-- Structure de la table `trajet`
--

CREATE TABLE `trajet` (
  `trajetid` int(11) NOT NULL,
  `datecreation` datetime NOT NULL,
  `datedepart` datetime NOT NULL,
  `statut` int(11) NOT NULL,
  `depart` int(11) NOT NULL,
  `destination` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `trajet`
--

INSERT INTO `trajet` (`trajetid`, `datecreation`, `datedepart`, `statut`, `depart`, `destination`) VALUES
(7, '2018-11-24 03:00:42', '2018-04-10 23:50:40', 1, 18, 22),
(8, '2018-11-24 03:01:01', '2018-04-10 23:50:40', 1, 15, 22),
(9, '2018-11-24 03:01:18', '2018-04-10 23:50:40', 1, 13, 13),
(10, '2018-11-24 03:01:37', '2018-04-10 23:50:40', 1, 10, 22),
(15, '2018-11-24 03:09:13', '2018-04-10 23:50:40', 1, 1, 22);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `trajetpersub`
--
CREATE TABLE `trajetpersub` (
`trajetid` int(11)
,`datecreation` datetime
,`datedepart` datetime
,`statut` int(11)
,`depart` int(11)
,`destination` int(11)
,`suburb` varchar(250)
,`city` varchar(250)
);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `userid` int(11) NOT NULL,
  `nom` varchar(250) NOT NULL,
  `prenom` varchar(250) NOT NULL,
  `cin` varchar(250) NOT NULL,
  `contact` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`userid`, `nom`, `prenom`, `cin`, `contact`, `email`, `password`) VALUES
(1, 'Hasina', 'Tafita', '112341587452', '02541785695', 'hasina@gmail.com', 'dsfdlnljgmldkgmnkjshfldk'),
(2, 'Toavina', 'Ralambosoa', '112341587452', '02541785695', 'toavina@gmail.com', 'dsfdlnljgmldkgmnkjshfldk');

-- --------------------------------------------------------

--
-- Structure de la vue `trajetpersub`
--
DROP TABLE IF EXISTS `trajetpersub`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `trajetpersub`  AS  select `trajet`.`trajetid` AS `trajetid`,`trajet`.`datecreation` AS `datecreation`,`trajet`.`datedepart` AS `datedepart`,`trajet`.`statut` AS `statut`,`trajet`.`depart` AS `depart`,`trajet`.`destination` AS `destination`,`point`.`suburb` AS `suburb`,`point`.`city` AS `city` from (`trajet` join `point` on((`trajet`.`destination` = `point`.`pointid`))) ;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `joindre`
--
ALTER TABLE `joindre`
  ADD PRIMARY KEY (`joindreid`),
  ADD KEY `pointuser_point_FK` (`trajetid`),
  ADD KEY `pointuser_user0_FK` (`userid`);

--
-- Index pour la table `point`
--
ALTER TABLE `point`
  ADD PRIMARY KEY (`pointid`);

--
-- Index pour la table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `trajet`
--
ALTER TABLE `trajet`
  ADD PRIMARY KEY (`trajetid`),
  ADD KEY `trajet_point_FK` (`depart`),
  ADD KEY `trajet_point0_FK` (`destination`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `joindre`
--
ALTER TABLE `joindre`
  MODIFY `joindreid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `point`
--
ALTER TABLE `point`
  MODIFY `pointid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT pour la table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `trajet`
--
ALTER TABLE `trajet`
  MODIFY `trajetid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `joindre`
--
ALTER TABLE `joindre`
  ADD CONSTRAINT `pointuser_point_FK` FOREIGN KEY (`trajetid`) REFERENCES `trajet` (`trajetid`),
  ADD CONSTRAINT `pointuser_user0_FK` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`);

--
-- Contraintes pour la table `trajet`
--
ALTER TABLE `trajet`
  ADD CONSTRAINT `trajet_point0_FK` FOREIGN KEY (`depart`) REFERENCES `point` (`pointid`),
  ADD CONSTRAINT `trajet_point_FK` FOREIGN KEY (`destination`) REFERENCES `point` (`pointid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
