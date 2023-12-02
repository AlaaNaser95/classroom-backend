-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Dec 02, 2023 at 07:52 PM
-- Server version: 8.0.18
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `classroom`
--
CREATE DATABASE IF NOT EXISTS `classroom` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `classroom`;

-- --------------------------------------------------------

--
-- Table structure for table `classroom`
--

DROP TABLE IF EXISTS `classroom`;
CREATE TABLE IF NOT EXISTS `classroom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `capacity` int(11) NOT NULL,
  `hasProjector` tinyint(4) NOT NULL DEFAULT '1',
  `building` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `floorNo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `classroom`
--

INSERT INTO `classroom` (`id`, `createdAt`, `deletedAt`, `name`, `capacity`, `hasProjector`, `building`, `floorNo`) VALUES
(1, '2023-12-02 22:26:01.159982', NULL, 'CR-100', 30, 1, 'Building1', 'Ground Floor'),
(2, '2023-12-02 22:27:59.940241', NULL, 'CR-101', 40, 1, 'Building1', 'Ground floor'),
(3, '2023-12-02 22:28:49.908367', NULL, 'CR-111', 30, 0, 'Building1', 'First floor'),
(4, '2023-12-02 22:31:52.967838', NULL, 'CR-211', 70, 1, 'Building2', 'First floor'),
(5, '2023-12-02 22:31:28.612045', NULL, 'CR-201', 30, 1, 'Building2', 'Ground floor'),
(6, '2023-12-02 22:32:37.081208', NULL, 'CR-300', 100, 1, 'Building 3', 'Ground floor'),
(7, '2023-12-02 22:33:05.188494', NULL, 'CR-310', 10, 0, 'Building 3', 'First floor');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(5, 1701271180503, 'CreateDatabaseTables1701271180503'),
(6, 1701272311840, 'UpldateClassroomFloorName1701272311840'),
(7, 1701275481884, 'UpdateTimeToDateTimeFormat1701275481884'),
(8, 1701281454526, 'EditFromTo1701281454526');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE IF NOT EXISTS `reservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `date` date NOT NULL,
  `classroomId` int(11) NOT NULL,
  `from` decimal(4,2) NOT NULL,
  `to` decimal(4,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2a551ee5e1d28e89efbc0c3b91a` (`classroomId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`id`, `createdAt`, `deletedAt`, `date`, `classroomId`, `from`, `to`) VALUES
(1, '2023-12-02 22:32:59.827400', NULL, '2023-12-02', 2, '8.00', '20.00'),
(2, '2023-12-02 22:36:42.257955', NULL, '2023-12-04', 1, '10.00', '13.00'),
(3, '2023-12-02 22:37:26.870398', NULL, '2023-12-04', 1, '15.00', '20.00');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `FK_2a551ee5e1d28e89efbc0c3b91a` FOREIGN KEY (`classroomId`) REFERENCES `classroom` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
