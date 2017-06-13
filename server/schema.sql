CREATE DATABASE chat;

USE chat;

/* Create other tables and define schemas for them here! */

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'messages'
-- All the stupid things people say
-- ---

DROP TABLE IF EXISTS `messages`;
    
CREATE TABLE `messages` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(128) NULL DEFAULT NULL,
  `room` INTEGER(2) NOT NULL DEFAULT 1,
  `user` INTEGER(10) NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `room`, `user`)
) COMMENT 'All the stupid things people say';

-- ---
-- Table 'users'
-- The crazy people who use our app
-- ---

DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) DEFAULT 'anonymous',
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`name`)
) COMMENT 'The crazy people who use our app';

-- ---
-- Table 'rooms'
-- The places they do their dirty deeds
-- ---

DROP TABLE IF EXISTS `rooms`;
    
CREATE TABLE `rooms` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) DEFAULT 'lobby',
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`name`)
) COMMENT 'The places they do their dirty deeds';

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (user) REFERENCES `users` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (room) REFERENCES `rooms` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

INSERT INTO `users` (`id`,`name`) VALUES (1, 'mike');
INSERT INTO `users` (`id`,`name`) VALUES (2, 'azmeer');
INSERT INTO `users` (`id`,`name`) VALUES (3, 'joethatbastard');
INSERT INTO `rooms` (`id`,`name`) VALUES (1, 'lobby');
INSERT INTO `rooms` (`id`,`name`) VALUES (2, 'patio');
INSERT INTO `rooms` (`id`,`name`) VALUES (3, 'funhouse');
INSERT INTO `rooms` (`id`,`name`) VALUES (4, 'xxxlingeriepatio');
INSERT INTO `messages` (`id`,`text`,`room`,`user`) VALUES (1,'yo', 1, 1);
INSERT INTO `messages` (`id`,`text`,`room`,`user`) VALUES (2,'hi', 1, 1);
INSERT INTO `messages` (`id`,`text`,`room`,`user`) VALUES (3,'hi', 2, 2);
INSERT INTO `messages` (`id`,`text`,`room`,`user`) VALUES (4,'uh', 2, 2);
INSERT INTO `messages` (`id`,`text`,`room`,`user`) VALUES (5,'yay', 3, 2);
INSERT INTO `messages` (`id`,`text`,`room`,`user`) VALUES (6,'oohlala', 4, 3);
INSERT INTO `messages` (`id`,`text`,`room`,`user`) VALUES (7,'wahwah', 4, 3);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

