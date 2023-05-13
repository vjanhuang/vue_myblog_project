/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80026 (8.0.26)
 Source Host           : localhost:3306
 Source Schema         : blog_sqlite

 Target Server Type    : MySQL
 Target Server Version : 80026 (8.0.26)
 File Encoding         : 65001

 Date: 13/05/2023 10:24:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of admin
-- ----------------------------
BEGIN;
INSERT INTO `admin` (`id`, `account`, `password`, `token`) VALUES (1, 'admin', '123456', '5813e795-4e2b-4457-be04-40a6d01e463c');
COMMIT;

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_id` bigint NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `content` text,
  `create_time` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=434340211167302 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of blog
-- ----------------------------
BEGIN;
INSERT INTO `blog` (`id`, `category_id`, `title`, `content`, `create_time`) VALUES (433717184073797, 433716943773765, 'hello', 'world', 1683724784393);
INSERT INTO `blog` (`id`, `category_id`, `title`, `content`, `create_time`) VALUES (433717341294661, 433716943773765, '测试标题002', '测试内容002', 1683724822777);
INSERT INTO `blog` (`id`, `category_id`, `title`, `content`, `create_time`) VALUES (433717386383429, 433716943773765, '测试标题003', '测试内容003', 1683724833785);
INSERT INTO `blog` (`id`, `category_id`, `title`, `content`, `create_time`) VALUES (433717509353541, 433716943773765, '测试标题004', '测试内容004S', 1683724863807);
INSERT INTO `blog` (`id`, `category_id`, `title`, `content`, `create_time`) VALUES (433717532618821, 433716943773765, '测试标题005', '测试内容005', 1683724869487);
INSERT INTO `blog` (`id`, `category_id`, `title`, `content`, `create_time`) VALUES (434329253814341, 434065858248773, 'js小测试', '<p>我用node js 写了一个很好的简单小项目<img src=\"http://localhost:8080/upload/434329228116037.jpeg\" alt=\"\" data-href=\"\" style=\"width: 95.00px;height: 107.44px;\"/></p>', 1683874215482);
INSERT INTO `blog` (`id`, `category_id`, `title`, `content`, `create_time`) VALUES (434329261854789, 434065858248773, 'js小测试', '<p>我用node js 写了一个很好的简单小项目<img src=\"http://localhost:8080/upload/434329228116037.jpeg\" alt=\"\" data-href=\"\" style=\"width: 95.00px;height: 107.44px;\"/></p>', 1683874217445);
COMMIT;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=434258617876550 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` (`id`, `name`) VALUES (434052202127429, '张量分解');
INSERT INTO `category` (`id`, `name`) VALUES (434053604724805, '张量填充');
INSERT INTO `category` (`id`, `name`) VALUES (434065858248773, '随想集');
INSERT INTO `category` (`id`, `name`) VALUES (434258617876549, '飞鸟集');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
