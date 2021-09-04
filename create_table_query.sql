CREATE TABLE `groups` (
  `g_id` int PRIMARY KEY,
  `g_name` varchar(255)
);

CREATE TABLE `users` (
  `u_id` int PRIMARY KEY,
  `u_name` varchar(255),
  `u_password` varchar(255),
  `g_id` int,
  `u_active` boolean
);

CREATE TABLE `user_group_relation` (
  `u_id` int PRIMARY KEY,
  `g_id` int,
  `u_type` varchar(255)
);

CREATE TABLE `posts` (
  `p_id` int PRIMARY KEY,
  `p_timestamp` datetime,
  `p_text` varchar(255),
  `p_localaddress` varchar(255),
  `u_id` int,
  `p_type` varchar(255)
);

CREATE TABLE `likes` (
  `p_id` int PRIMARY KEY,
  `u_id` int,
  `l_timestamp` datetime
);

CREATE TABLE `shares` (
  `p_id` int PRIMARY KEY,
  `u_id` int,
  `s_timestamp` datetime
);

CREATE TABLE `comments` (
  `p_id` int PRIMARY KEY,
  `u_id` int,
  `c_timestamp` datetime,
  `c_text` varchar(255)
);

ALTER TABLE `users` ADD FOREIGN KEY (`g_id`) REFERENCES `groups` (`g_id`);

ALTER TABLE `user_group_relation` ADD FOREIGN KEY (`g_id`) REFERENCES `groups` (`g_id`);

ALTER TABLE `user_group_relation` ADD FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`);

ALTER TABLE `likes` ADD FOREIGN KEY (`p_id`) REFERENCES `posts` (`p_id`);

ALTER TABLE `likes` ADD FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`);

ALTER TABLE `shares` ADD FOREIGN KEY (`p_id`) REFERENCES `posts` (`p_id`);

ALTER TABLE `shares` ADD FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`p_id`) REFERENCES `posts` (`p_id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`);
