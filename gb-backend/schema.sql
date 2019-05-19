/* TODO  implementation migrations */

CREATE TABLE `builds` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `charname` varchar(255) DEFAULT NULL,
 `class` varchar(255) DEFAULT NULL,
 `mastery1` varchar(255) DEFAULT NULL,
 `mastery2` varchar(255) DEFAULT NULL,
 `damagetype` varchar(255) DEFAULT NULL,
 `activeskills` varchar(255) DEFAULT NULL,
 `passiveskills` varchar(255) DEFAULT NULL,
 `playstyle` varchar(255) DEFAULT NULL,
 `version` varchar(255) DEFAULT NULL,
 `gearreq` varchar(255) DEFAULT NULL,
 `cruci` varchar(255) DEFAULT NULL,
 `srlevel` varchar(255) DEFAULT NULL,
 `guide` varchar(4096) DEFAULT NULL,
 `author` varchar(255) DEFAULT NULL,
 `primaryskill` varchar(255) DEFAULT NULL,
 `link` varchar(255) DEFAULT NULL,
 `purpose` varchar(255) DEFAULT NULL,
 `blurb` varchar(1024) DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
