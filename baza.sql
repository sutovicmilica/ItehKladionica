/*
SQLyog Community
MySQL - 10.4.20-MariaDB : Database - kladionica
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `game` */

DROP TABLE IF EXISTS `game`;

CREATE TABLE `game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `hostId` int(11) DEFAULT NULL,
  `guestId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4084468356497d7dcedd09502ff` (`hostId`),
  KEY `FK_a423af0e17cb4905e5afa644be8` (`guestId`),
  CONSTRAINT `FK_4084468356497d7dcedd09502ff` FOREIGN KEY (`hostId`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_a423af0e17cb4905e5afa644be8` FOREIGN KEY (`guestId`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `game` */

insert  into `game`(`id`,`date`,`hostId`,`guestId`) values 
(2,'2022-07-06 19:46:56',3,4),
(3,'2022-07-06 13:40:27',5,7),
(5,'2022-08-15 20:00:03',5,2);

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`timestamp`,`name`) values 
(1,1656575215742,'createUserTable1656575215742'),
(2,1656575297382,'createPlayTable1656575297382'),
(3,1656575434312,'createTeamTable1656575434312'),
(4,1656575514618,'createGameTable1656575514618'),
(5,1656575787286,'createQuotaTable1656575787286'),
(6,1656575934383,'createTicketTable1656575934383'),
(7,1656576632626,'createTicketItemTable1656576632626'),
(8,1656709909559,'changestatuses1656709909559'),
(9,1656797576121,'quotachanges1656797576121');

/*Table structure for table `play` */

DROP TABLE IF EXISTS `play`;

CREATE TABLE `play` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;

/*Data for the table `play` */

insert  into `play`(`id`,`name`) values 
(1,'1'),
(2,'2'),
(3,'X'),
(4,'1-1'),
(5,'1-2'),
(6,'1-X'),
(7,'2-2'),
(8,'2-1'),
(9,'2-X'),
(10,'X-1'),
(11,'X-2'),
(12,'X-X'),
(13,'12'),
(14,'1X'),
(15,'X2'),
(16,'GG'),
(17,'NG'),
(18,'GG3+'),
(19,'GG4+'),
(20,'11'),
(21,'22'),
(22,'1&GG'),
(23,'1&3+'),
(24,'P1GG'),
(25,'P2GG'),
(26,'0-2g'),
(27,'0-1g'),
(28,'3+'),
(29,'4+'),
(30,'6+'),
(31,'2-4g'),
(32,'2-5g'),
(33,'2+');

/*Table structure for table `quota` */

DROP TABLE IF EXISTS `quota`;

CREATE TABLE `quota` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` decimal(9,2) NOT NULL,
  `gameId` int(11) DEFAULT NULL,
  `playId` int(11) DEFAULT NULL,
  `status` enum('PENDING','WON','LOST','CANCELED') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bb397097a1b450f5b39c1d72e4c` (`gameId`),
  KEY `FK_c5316f44be54b99ff8efc13fa54` (`playId`),
  CONSTRAINT `FK_bb397097a1b450f5b39c1d72e4c` FOREIGN KEY (`gameId`) REFERENCES `game` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `FK_c5316f44be54b99ff8efc13fa54` FOREIGN KEY (`playId`) REFERENCES `play` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

/*Data for the table `quota` */

insert  into `quota`(`id`,`value`,`gameId`,`playId`,`status`) values 
(1,1.23,NULL,1,'CANCELED'),
(2,7.30,NULL,2,'CANCELED'),
(3,4.60,NULL,3,'CANCELED'),
(4,1.50,NULL,4,'CANCELED'),
(5,1.03,2,16,'LOST'),
(6,4.10,2,17,'WON'),
(7,1.60,3,4,'PENDING'),
(8,2.00,5,6,'PENDING');

/*Table structure for table `team` */

DROP TABLE IF EXISTS `team`;

CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `fieldName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

/*Data for the table `team` */

insert  into `team`(`id`,`name`,`fieldName`) values 
(1,'Liverpool','Anfield'),
(2,'MANUTD','Old traford'),
(3,'RMA','Santiago Bernabeo'),
(4,'BARCELONA','Camp nou'),
(5,'Chelsea','Stamford Bridge'),
(6,'MCI','Etihad Stadium'),
(7,'Arsenal','Emirates Stadium');

/*Table structure for table `ticket` */

DROP TABLE IF EXISTS `ticket`;

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `status` enum('PENDING','WON','LOST') NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `posibleWin` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0e01a7c92f008418bad6bad5919` (`userId`),
  CONSTRAINT `FK_0e01a7c92f008418bad6bad5919` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `ticket` */

insert  into `ticket`(`id`,`date`,`status`,`userId`,`amount`,`posibleWin`) values 
(1,'2022-07-06 23:09:04','PENDING',2,20,700),
(2,'2022-07-07 19:50:24','LOST',2,50,200),
(3,'2022-07-07 19:53:16','WON',2,2333,9565);

/*Table structure for table `ticket_item` */

DROP TABLE IF EXISTS `ticket_item`;

CREATE TABLE `ticket_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticketId` int(11) NOT NULL,
  `quotaId` int(11) DEFAULT NULL,
  `quotaValue` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`,`ticketId`),
  KEY `FK_5ec69cdb2d87cb6eeee2b6cecf8` (`ticketId`),
  KEY `FK_c9992e8925c3256ab039e37c3ff` (`quotaId`),
  CONSTRAINT `FK_5ec69cdb2d87cb6eeee2b6cecf8` FOREIGN KEY (`ticketId`) REFERENCES `ticket` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_c9992e8925c3256ab039e37c3ff` FOREIGN KEY (`quotaId`) REFERENCES `quota` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `ticket_item` */

insert  into `ticket_item`(`id`,`ticketId`,`quotaId`,`quotaValue`) values 
(1,1,1,1.00),
(2,1,2,1.00),
(3,1,3,1.00),
(4,2,5,1.00),
(5,2,6,4.00),
(6,3,6,4.10);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `birthDate` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` enum('user','admin') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`firstName`,`lastName`,`birthDate`,`email`,`password`,`type`) values 
(1,'Admin','Admin','1994-09-08 22:58:37','admin@gmail.com','/1rBkZBCSx2I+UGe+UmuVm99EJL9j/wWOMl9pvJ/Oxg=','admin'),
(2,'Marko','Ruzic','1995-08-22 01:34:27','m@gmail.com','/1rBkZBCSx2I+UGe+UmuVm99EJL9j/wWOMl9pvJ/Oxg=','user');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
