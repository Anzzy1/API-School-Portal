-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: aguinaldo_portal
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applicants`
--

DROP TABLE IF EXISTS `applicants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applicants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT '',
  `last_name` varchar(50) NOT NULL,
  `suffix` varchar(10) DEFAULT '',
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT 'Male',
  `nationality` varchar(50) DEFAULT '',
  `religion` varchar(50) DEFAULT '',
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT '',
  `mother_name` varchar(100) DEFAULT '',
  `mother_phone` varchar(20) DEFAULT '',
  `father_name` varchar(100) DEFAULT '',
  `father_phone` varchar(20) DEFAULT '',
  `guardian_name` varchar(100) DEFAULT '',
  `guardian_phone` varchar(20) DEFAULT '',
  `address` varchar(100) DEFAULT '',
  `country` varchar(50) DEFAULT '',
  `region` varchar(50) DEFAULT '',
  `province` varchar(50) DEFAULT '',
  `city` varchar(50) DEFAULT '',
  `barangay` varchar(100) DEFAULT '',
  `course_code` varchar(20) DEFAULT '',
  `year_level` varchar(20) DEFAULT '1st Year',
  `status` enum('pending','enrolled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applicants`
--

LOCK TABLES `applicants` WRITE;
/*!40000 ALTER TABLE `applicants` DISABLE KEYS */;
INSERT INTO `applicants` VALUES (1,'UA202600001','MOHAMAD','ANZAR','PANGCOGA','','2007-08-02','Male','Filipino','Islam','mohamadanzarpangcoga@gmail.com','09567491874','','','','','','','Brittany 1','Philippines','CALABARZON','RIZAL','Antipolo City','San Isidro','BSIT','1st Year','enrolled','2026-06-07 11:09:36'),(2,'UA202600002','RODEL','pASM','PANGCOGA','',NULL,'Male','','','qwe','','','','','','','','','','','','','','BSIT','1st Year','enrolled','2026-06-09 14:59:44'),(3,'UA202600003','RODEL','PASM','SERRANO','',NULL,'Male','','','rodelserrano@gmail.com','','trwe','','','','','','TRYWer','Philippines','Region IV-A - CALABARZON','','Antipolo City','Dela Paz','BSIT','1st Year','enrolled','2026-06-09 14:59:44'),(4,'UA202600004','JOHN','FELIX','ESTOLANO','','2008-06-13','Male','Filipino','Roman Catholic','estolanof@gmail.com','09569034952','ewq','09569034234','qwe','09563464952','wer','09530534952','unahan','Philippines','Region IV-A - CALABARZON','','Antipolo City','San Roque','BSA','2nd Year','enrolled','2026-06-11 14:42:16'),(5,'UA202600005','MARK','KENNETH','DAMPIL','','2004-06-17','Male','Filipino','Roman Catholic','markdampil@gmail.com','095235234','hfdgh','095235234','ghtyer','095235234','gdfgsfd','095235234','rtsdf','Philippines','Region IV-A - CALABARZON','','Antipolo City','San Roque','BSIS','3rd Year','enrolled','2026-06-11 14:47:02'),(6,'UA202600006','SHANE NICOLE','STAMPA','SALAPI','','2007-11-20','Female','Filipino','Islam','shanenicolesalapi@gmail.com','09708548346','ELVIE SALAPI','09708548346','NELBERT SALAPI','09708548346','ELVIE SALAPI','09708548346','DAANG BAKAL ROAD','Philippines','Region IV-A - CALABARZON','','Antipolo City','Dela Paz','BSHM','1st Year','enrolled','2026-06-11 14:52:14'),(7,'UA202600007','ISHMAEL','LEVI','ORLANDA','','2004-10-20','Male','Filipino','Roman Catholic','levi@gmail.com','0923424143','bfsfhg','0923424143','fsdgbvc','0923424143','sdfgbd','0923424143','asdcx','Philippines','Region IV-A - CALABARZON','','Antipolo City','Santa Cruz','BSCS','1st Year','enrolled','2026-06-11 14:54:57');
/*!40000 ALTER TABLE `applicants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_code` varchar(20) NOT NULL,
  `course_name` varchar(100) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `tuition` decimal(10,2) DEFAULT 0.00,
  `misc_fees` decimal(10,2) DEFAULT 0.00,
  `duration` varchar(50) DEFAULT '4 years',
  PRIMARY KEY (`id`),
  UNIQUE KEY `course_code` (`course_code`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'BSIT','BS in Information Technology','IT Department','Focus on software development, networking, and database management.',45000.00,12000.00,'4 years'),(2,'BSCS','BS in Computer Science','IT Department','Focus on algorithms, programming languages, and computational theory.',45000.00,12000.00,'4 years'),(3,'BSBA','BS in Business Administration','Business Department','Focus on management, marketing, and business operations.',38000.00,10000.00,'4 years'),(5,'BSED','BS in Secondary Education','Education Department','Focus on teaching methodologies and curriculum development.',35000.00,9000.00,'4 years'),(7,'BSHM','BS in Hospitality Management','HM Department','Focus on hotel and restaurant management, tourism.',42000.00,11000.00,'4 years'),(8,'BSA','BS in Accountancy','Business Department','Focus on accounting principles, auditing, and taxation.',40000.00,10000.00,'4 years'),(9,'BSIS','BS in Information Systems','IT Department','Focus on business systems analysis and IT solutions.',43000.00,12000.00,'4 years'),(10,'BELEMed','Bachelor of Elementary Education','Education Department','Focus on teaching methodologies for elementary education.',35000.00,9000.00,'4 years'),(11,'BSC','BS in Criminology','Criminology Department','Focus on criminal justice system and law enforcement.',40000.00,11000.00,'4 years'),(12,'BSTM','BS in Tourism Management','HM Department','Focus on travel, tourism planning, and destination management.',40000.00,11000.00,'4 years'),(13,'BSCpE','BS in Computer Engineering','Engineering Department','Focus on hardware, embedded systems, and computer architecture.',45000.00,13000.00,'5 years'),(14,'BPA','Bachelor in Public Administration','Business Department','Focus on governance, public policy, and administrative management.',36000.00,9000.00,'4 years');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(20) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `grade` decimal(5,2) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `school_year` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
INSERT INTO `grades` VALUES (1,'UA202600001','OLSOFAPP',1.00,'1st Trimester','2026-2027'),(2,'UA202600001','OLPHYE001',1.00,'1st Trimester','2026-2027'),(3,'UA202600001','OLNSTP-1',1.25,'1st Trimester','2026-2027'),(4,'UA202600001','OLMATH01',1.50,'1st Trimester','2026-2027'),(5,'UA202600001','OLFIL-01',1.25,'1st Trimester','2026-2027'),(6,'UA202600001','',5.00,'1st Trimester','2026-2027'),(7,'UA202600001','',5.00,'1st Trimester','2026-2027'),(9,'UA202600001','OLENG01',5.00,'1st Trimester','2026-2027');
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsletter_subscribers`
--

DROP TABLE IF EXISTS `newsletter_subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newsletter_subscribers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `subscribed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletter_subscribers`
--

LOCK TABLES `newsletter_subscribers` WRITE;
/*!40000 ALTER TABLE `newsletter_subscribers` DISABLE KEYS */;
INSERT INTO `newsletter_subscribers` VALUES (1,'mohamadanzarpangcoga@gmail.com','2026-06-11 13:35:38');
/*!40000 ALTER TABLE `newsletter_subscribers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `message` text NOT NULL,
  `type` enum('info','warning','success','error') DEFAULT 'info',
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ph_cities`
--

DROP TABLE IF EXISTS `ph_cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ph_cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `region_name` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ph_cities`
--

LOCK TABLES `ph_cities` WRITE;
/*!40000 ALTER TABLE `ph_cities` DISABLE KEYS */;
/*!40000 ALTER TABLE `ph_cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ph_regions`
--

DROP TABLE IF EXISTS `ph_regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ph_regions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ph_regions`
--

LOCK TABLES `ph_regions` WRITE;
/*!40000 ALTER TABLE `ph_regions` DISABLE KEYS */;
/*!40000 ALTER TABLE `ph_regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(20) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `day` varchar(20) NOT NULL,
  `time_start` varchar(10) NOT NULL,
  `time_end` varchar(10) NOT NULL,
  `room` varchar(20) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES (1,'UA202600001','IT101','Monday','7:00','9:00','B.101'),(2,'UA202600001','IT102','Tuesday','9:00','11:00','B.102'),(3,'UA202600001','IT103','Wednesday','13:00','15:00','B.103'),(4,'UA202600002','IT101','Monday','7:00','9:00','B.101'),(5,'UA202600002','IT102','Tuesday','9:00','11:00','B.102'),(6,'UA202600002','IT103','Wednesday','13:00','15:00','B.103'),(7,'UA202600003','IT101','Monday','7:00','9:00','B.101'),(8,'UA202600003','IT102','Tuesday','9:00','11:00','B.102'),(9,'UA202600003','IT103','Wednesday','13:00','15:00','B.103'),(10,'UA202600004','BSA101','Monday','7:00','9:00','B.101'),(11,'UA202600004','BSA102','Tuesday','9:00','11:00','B.102'),(12,'UA202600005','IS101','Monday','7:00','9:00','B.101'),(13,'UA202600005','IS102','Tuesday','9:00','11:00','B.102'),(14,'UA202600006','HM101','Monday','7:00','9:00','B.101'),(15,'UA202600006','HM102','Tuesday','9:00','11:00','B.102'),(16,'UA202600007','CS101','Monday','7:00','9:00','B.101'),(17,'UA202600007','CS102','Tuesday','9:00','11:00','B.102');
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_code` varchar(20) NOT NULL,
  `subject_name` varchar(100) NOT NULL,
  `units` int(11) NOT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subject_code` (`subject_code`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'IT101','Introduction to Computing',3,'BSIT'),(2,'IT102','Programming Fundamentals',3,'BSIT'),(3,'IT103','Web Development',3,'BSIT'),(4,'CS101','Discrete Mathematics',3,'BSCS'),(5,'CS102','Data Structures',3,'BSCS'),(6,'BA101','Principles of Management',3,'BSBA'),(7,'CRIM101','Introduction to Criminology',3,'BSCRIM'),(8,'ED101','Foundations of Education',3,'BSED'),(9,'ENT101','Business Planning',3,'BSEntrep'),(10,'HM101','Intro to Hospitality',3,'BSHM');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT '',
  `last_name` varchar(50) NOT NULL,
  `suffix` varchar(10) DEFAULT '',
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','operator') DEFAULT 'student',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'OPE-0001','System','','Administrator','','admin@aguinaldo.edu.ph','admin123','operator','2026-06-07 11:03:14'),(4,'UA202600001','MOHAMAD','ANZAR','PANGCOGA','','mohamadanzarpangcoga@gmail.com','$2a$10$NYpZDyCMynQiYht4Cex.gOl6D7njk1ULeoe/HSr3lefkgXRB0A0ga','student','2026-06-07 11:09:36'),(5,'UA202600002','RODEL','pASM','PANGCOGA','','qwe','$2a$10$k1slKpHVNfqxSadBes6YBeL.CzpdA3jS6nQ.9uQWrX.SU7Yj48m6a','student','2026-06-09 14:50:14'),(6,'UA202600003','RODEL','PASM','SERRANO','','rodelserrano@gmail.com','$2a$10$Xr7bdl1wiKHc/3y36oZ5lOxSuG7LjxHQxLv8UFz.k0eghjDQN0F4i','student','2026-06-09 14:56:01'),(9,'UA202600004','JOHN','FELIX','ESTOLANO','','estolanof@gmail.com','$2a$10$5PEKeZ4G735jZz4aCQWRA.u5Ep6dDM4LMT9e.J0jCMjMWrrXHqmpy','student','2026-06-11 14:42:16'),(10,'UA202600005','MARK','KENNETH','DAMPIL','','markdampil@gmail.com','$2a$10$Jfu.cy0EGiEzbbYM50TMEub0cPpvSEhyTuGD0ELfkji0n82r8PYuq','student','2026-06-11 14:47:02'),(11,'UA202600006','SHANE NICOLE','STAMPA','SALAPI','','shanenicolesalapi@gmail.com','$2a$10$mioHIq852WTeKNOExDzwd./n6pBy4W6X7SkZKql8den1qEE5QsOPS','student','2026-06-11 14:52:14'),(12,'UA202600007','ISHMAEL','LEVI','ORLANDA','','levi@gmail.com','$2a$10$8RfaHyzigLsU5R3egYmrWeTIXS2TIZ3sGKJHeR8TTR.2VRo2uSqE2','student','2026-06-11 14:54:57');
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

-- Dump completed on 2026-06-12  1:32:02
