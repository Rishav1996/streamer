CREATE DATABASE  IF NOT EXISTS `stream_analytics` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `stream_analytics`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: stream_analytics
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `u_id` int NOT NULL AUTO_INCREMENT,
  `u_name` varchar(255) DEFAULT NULL,
  `u_password` varchar(255) DEFAULT NULL,
  `g_id` int DEFAULT NULL,
  `u_active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'temp','temp',2,0),(2,'Mehetabel','Mehetabel',2,1),(3,'Darin','Darin',3,1),(4,'Elayne','Elayne',2,0),(5,'Reagan','Reagan',1,1),(6,'Sayre','Sayre',3,0),(7,'Olin','Olin',4,0),(8,'Kelby','Kelby',4,1),(9,'Mufinella','Mufinella',1,0),(10,'Danica','Danica',3,0),(11,'Celie','Celie',3,1),(12,'Onofredo','Onofredo',3,1),(13,'Leonanie','Leonanie',1,0),(14,'Jillian','Jillian',4,0),(15,'Roddy','Roddy',4,0),(16,'Janette','Janette',4,1),(17,'Enoch','Enoch',1,0),(18,'Kimmi','Kimmi',3,0),(19,'Fionnula','Fionnula',4,0),(20,'Burg','Burg',2,0),(21,'Lucias','Lucias',2,1),(22,'Miguel','Miguel',4,0),(23,'Suzie','Suzie',3,0),(24,'Leticia','Leticia',4,1),(25,'Thacher','Thacher',1,1),(26,'Cati','Cati',3,0),(27,'Waylan','Waylan',2,1),(28,'Barry','Barry',4,0),(29,'Rossy','Rossy',3,0),(30,'Noemi','Noemi',3,0),(31,'Rhianon','Rhianon',2,0),(32,'Tynan','Tynan',2,1),(33,'Alanah','Alanah',3,1),(34,'Neely','Neely',3,1),(35,'Benson','Benson',3,1),(36,'Freddy','Freddy',1,0),(37,'Arnuad','Arnuad',3,0),(38,'Rhea','Rhea',2,1),(39,'Tessie','Tessie',2,1),(40,'Kacy','Kacy',3,0),(41,'Farley','Farley',2,1),(42,'Shay','Shay',3,1),(43,'Farrell','Farrell',3,1),(44,'Kesley','Kesley',2,0),(45,'Giordano','Giordano',3,0),(46,'Chan','Chan',3,1),(47,'Carey','Carey',1,0),(48,'Rosa','Rosa',2,0),(49,'Debera','Debera',3,1),(50,'Natividad','Natividad',4,1),(51,'Nadiya','Nadiya',3,0),(52,'Gaven','Gaven',4,0),(53,'Jerrine','Jerrine',3,0),(54,'Janka','Janka',3,1),(55,'Aaron','Aaron',3,1),(56,'Elvis','Elvis',2,1),(57,'Robena','Robena',3,1),(58,'Francklin','Francklin',2,1),(59,'Clari','Clari',2,1),(60,'Frannie','Frannie',4,0),(61,'Alric','Alric',3,0),(62,'Fransisco','Fransisco',2,1),(63,'Masha','Masha',2,0),(64,'Alric','Alric',4,0),(65,'Waite','Waite',4,0),(66,'Jermayne','Jermayne',4,0),(67,'Tymothy','Tymothy',3,0),(68,'Flore','Flore',4,0),(69,'Tan','Tan',1,0),(70,'Meridel','Meridel',4,1),(71,'Chan','Chan',2,1),(72,'Roz','Roz',4,0),(73,'Loydie','Loydie',2,0),(74,'Inger','Inger',2,1),(75,'Olav','Olav',3,1),(76,'Glenda','Glenda',2,1),(77,'Giffer','Giffer',3,1),(78,'Saw','Saw',1,1),(79,'Dulcie','Dulcie',3,0),(80,'Jordanna','Jordanna',1,1),(81,'Hestia','Hestia',4,1),(82,'Hiram','Hiram',4,1),(83,'Jeannie','Jeannie',4,0),(84,'Arty','Arty',1,0),(85,'Justinian','Justinian',4,0),(86,'Marlane','Marlane',4,1),(87,'Elly','Elly',4,1),(88,'Donielle','Donielle',2,1),(89,'Jamie','Jamie',2,0),(90,'Kala','Kala',4,1),(91,'Zitella','Zitella',1,0),(92,'Bunni','Bunni',4,1),(93,'Dasya','Dasya',3,0),(94,'Harris','Harris',4,0),(95,'Debra','Debra',2,0),(96,'William','William',4,1),(97,'Olav','Olav',3,0),(98,'Currie','Currie',1,0),(99,'Marrissa','Marrissa',3,1),(100,'Doloritas','Doloritas',4,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-18  9:27:11
