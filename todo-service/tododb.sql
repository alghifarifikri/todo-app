-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 16, 2024 at 07:10 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tododb`
--

-- --------------------------------------------------------

--
-- Table structure for table `revoke_token`
--

CREATE TABLE `revoke_token` (
  `id_token` varchar(200) NOT NULL,
  `token` varchar(300) NOT NULL,
  `revoked` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `revoke_token`
--

INSERT INTO `revoke_token` (`id_token`, `token`, `revoked`) VALUES
('2a07e00b-f622-4c1f-ba41-29affdad062c', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiOTk5ZWE0OGMtZDE2ZS00NTg5LTlhZWItYTg2ZTIyOTQ4MGM2IiwiZW1haWwiOiJhbGZhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWxmYXJlZXoiLCJpYXQiOjE3MjY0NjE0ODksImV4cCI6MTcyNjQ2NTA4OX0.2c9FiX-9BPqQIil5F5cH1YPTigw-MJykhEwevU-tAn0', '0'),
('365349a8-3bf3-4993-8b80-b854748b2d8b', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiOTk5ZWE0OGMtZDE2ZS00NTg5LTlhZWItYTg2ZTIyOTQ4MGM2IiwiZW1haWwiOiJhbGZhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWxmYXJlZXoiLCJpYXQiOjE3MjY0NTYyMzMsImV4cCI6MTcyNjQ1OTgzM30.ug9AxKE5jCU6KFOYkjKyYG3HH3ll_h-qecQXQK7HWz4', '0'),
('408830e7-57eb-418f-8602-fe5d1d7ca85b', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiOTk5ZWE0OGMtZDE2ZS00NTg5LTlhZWItYTg2ZTIyOTQ4MGM2IiwiZW1haWwiOiJhbGZhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWxmYXJlZXoiLCJpYXQiOjE3MjY0NjE1MTgsImV4cCI6MTcyNjQ2NTExOH0.9w2E3WNCAxkltQbXfPnLB5Qc4meuiZbCxqM74_YGeys', '0'),
('904c2464-87d2-4d69-bc90-3caa18406565', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiOTk5ZWE0OGMtZDE2ZS00NTg5LTlhZWItYTg2ZTIyOTQ4MGM2IiwiZW1haWwiOiJhbGZhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWxmYXJlZXoiLCJpYXQiOjE3MjY0NjAxMTgsImV4cCI6MTcyNjQ2MzcxOH0.ZCS_Qb3rWeEi6TOnqlaySeoF355h7AVHAckD3doNeus', '0'),
('e931c479-9789-4aa9-a835-a0103688a6e5', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiOTk5ZWE0OGMtZDE2ZS00NTg5LTlhZWItYTg2ZTIyOTQ4MGM2IiwiZW1haWwiOiJhbGZhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWxmYXJlZXoiLCJpYXQiOjE3MjY0NTI2MjEsImV4cCI6MTcyNjQ1NjIyMX0.WFI3LVcCLq3_qVIvPwCZfhi5Fbzqx3BUHeJox_WKlII', '0');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id_task` varchar(200) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `task_number` varchar(50) NOT NULL,
  `created_by` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id_task`, `subject`, `description`, `task_number`, `created_by`, `status`) VALUES
('1b97a201-77b8-4027-89de-84be558833da', 'coba coba 2', 'coba coba deskripsi 2', 'AC-0002', 'alfareez', 'todo'),
('449a65da-7b19-44b4-a99f-827c9da28c40', 'test user edit', 'test desc edit', 'AC-0005', 'dummy', 'canceled'),
('c022c6c0-f6fe-4cb8-a7dc-c43609bb6e2d', 'Create UI', 'Create UI for todo app', 'AC-0006', 'alfareez', 'todo');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` varchar(200) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `email`, `password`) VALUES
('11067002-73ce-4645-b4cd-24322118ed8a', 'dummy', 'dummy@mail.com', '$2a$10$iYlJDmqCvnCaB0W3nJt8uuhPn4iQfnmELXt971k1lyZf49gosTlBK'),
('999ea48c-d16e-4589-9aeb-a86e229480c6', 'alfareez', 'alfa@gmail.com', '$2a$10$RUNvxkilPpsnUI1mtrGPPeeaWgdY2SHQXcnzBLc9vwGfbsZmlx08i');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `revoke_token`
--
ALTER TABLE `revoke_token`
  ADD PRIMARY KEY (`id_token`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id_task`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
