-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-04-27 05:07:34
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_system`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '姓名',
  `user_name` varchar(16) NOT NULL DEFAULT '' COMMENT '登录名',
  `password` varchar(255) NOT NULL DEFAULT '' COMMENT '密码',
  `age` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '年龄',
  `sex` varchar(3) NOT NULL DEFAULT '未知' COMMENT '性别',
  `email` varchar(255) NOT NULL DEFAULT '' COMMENT '邮箱',
  `phone` varchar(255) NOT NULL DEFAULT '' COMMENT '联系电话',
  `state` varchar(5) NOT NULL DEFAULT '正常' COMMENT '账号状态',
  `created_at` int(11) NOT NULL DEFAULT '0' COMMENT '新增时间',
  `updated_at` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员';

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `name`, `user_name`, `password`, `age`, `sex`, `email`, `phone`, `state`, `created_at`, `updated_at`) VALUES
(0, '蔡红辉', 'admin', '202cb962ac59075b964b07152d234b70', 20, '男', '2540255694@qq.com', '13059596499', '正常', 1513096068, 1524798278);

-- --------------------------------------------------------

--
-- 表的结构 `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `book_name` varchar(255) NOT NULL DEFAULT '' COMMENT '书名',
  `author` varchar(255) NOT NULL DEFAULT '' COMMENT '作者',
  `publishing_time` varchar(255) NOT NULL DEFAULT '' COMMENT '出版时间',
  `press` varchar(255) NOT NULL DEFAULT '' COMMENT '出版社',
  `book_type` varchar(255) NOT NULL DEFAULT '' COMMENT '图书类型',
  `price` tinyint(255) UNSIGNED NOT NULL DEFAULT '0' COMMENT '价格',
  `state` varchar(3) NOT NULL DEFAULT '正常' COMMENT '状态',
  `stock` int(11) NOT NULL DEFAULT '0' COMMENT '库存',
  `message` varchar(255) NOT NULL DEFAULT '' COMMENT '简介',
  `created_at` int(11) NOT NULL DEFAULT '0' COMMENT '新增时间',
  `updated_at` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='图书表';

-- --------------------------------------------------------

--
-- 表的结构 `book_class`
--

CREATE TABLE `book_class` (
  `id` int(11) NOT NULL,
  `book_class_name` varchar(255) NOT NULL DEFAULT '' COMMENT '图书分类名称',
  `remarks` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `created_at` int(11) NOT NULL DEFAULT '0' COMMENT '新增时间',
  `updated_at` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='图书分类表';

-- --------------------------------------------------------

--
-- 表的结构 `comment_table`
--

CREATE TABLE `comment_table` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL DEFAULT '' COMMENT '用户ID',
  `user_name` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名字',
  `book_id` varchar(255) NOT NULL DEFAULT '' COMMENT '图书id',
  `book_name` varchar(255) NOT NULL DEFAULT '' COMMENT '图书名字',
  `book_type` varchar(255) NOT NULL COMMENT '图书类型',
  `content` varchar(255) NOT NULL COMMENT '评论内容',
  `state` varchar(255) NOT NULL COMMENT '审核状态',
  `created_at` int(11) NOT NULL DEFAULT '0' COMMENT '新增时间',
  `updated_at` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='评论表';

-- --------------------------------------------------------

--
-- 表的结构 `order_table`
--

CREATE TABLE `order_table` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL DEFAULT '' COMMENT '用户ID',
  `user_name` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名字',
  `login_name` varchar(255) NOT NULL COMMENT '登录名',
  `phone` varchar(255) NOT NULL COMMENT '联系电话',
  `book_id` varchar(255) NOT NULL DEFAULT '' COMMENT '图书id',
  `book_name` varchar(255) NOT NULL DEFAULT '' COMMENT '图书名字',
  `author` varchar(255) NOT NULL COMMENT '作者',
  `book_type` varchar(255) NOT NULL COMMENT '图书类型',
  `order_count` varchar(255) NOT NULL COMMENT '订购数量',
  `total` float NOT NULL DEFAULT '0' COMMENT '总价',
  `receiving_address` varchar(255) NOT NULL COMMENT '收货地址',
  `message` varchar(255) NOT NULL COMMENT '备注',
  `state` varchar(255) NOT NULL DEFAULT '待发货' COMMENT '状态',
  `created_at` int(11) NOT NULL DEFAULT '0' COMMENT '新增时间',
  `updated_at` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单表';

-- --------------------------------------------------------

--
-- 表的结构 `system_info`
--

CREATE TABLE `system_info` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT '' COMMENT '信息类型',
  `content` varchar(255) NOT NULL DEFAULT '0' COMMENT '详细信息',
  `created_at` int(11) NOT NULL DEFAULT '0' COMMENT '新增时间',
  `updated_at` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统信息表';

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '姓名',
  `user_name` varchar(255) NOT NULL DEFAULT '' COMMENT '登录名',
  `password` varchar(32) NOT NULL DEFAULT '' COMMENT '密码',
  `sex` varchar(3) NOT NULL DEFAULT '未知' COMMENT '性别',
  `age` int(3) NOT NULL DEFAULT '0' COMMENT '年龄',
  `email` varchar(255) NOT NULL DEFAULT '' COMMENT '邮箱',
  `phone` varchar(255) NOT NULL DEFAULT '' COMMENT '电话',
  `receiving_address` varchar(255) NOT NULL DEFAULT '' COMMENT '收货地址',
  `created_at` int(11) NOT NULL DEFAULT '0' COMMENT '新增时间',
  `updated_at` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book_class`
--
ALTER TABLE `book_class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment_table`
--
ALTER TABLE `comment_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_table`
--
ALTER TABLE `order_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `system_info`
--
ALTER TABLE `system_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- 使用表AUTO_INCREMENT `book_class`
--
ALTER TABLE `book_class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- 使用表AUTO_INCREMENT `comment_table`
--
ALTER TABLE `comment_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- 使用表AUTO_INCREMENT `order_table`
--
ALTER TABLE `order_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- 使用表AUTO_INCREMENT `system_info`
--
ALTER TABLE `system_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
