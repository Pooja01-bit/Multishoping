-- =============================================================================
-- MULTIMART E-COMMERCE MYSQL DATABASE SCHEMA & SEED DATA
-- Target Engine: MySQL 5.7+ / MySQL 8.0 / MariaDB
-- =============================================================================

CREATE DATABASE IF NOT EXISTS `multimart_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `multimart_db`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. USERS TABLE
CREATE TABLE `users` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(120) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(20) NOT NULL DEFAULT 'customer',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. PRODUCTS TABLE
CREATE TABLE `products` (
    `id` VARCHAR(50) PRIMARY KEY,
    `product_name` VARCHAR(200) NOT NULL,
    `img_url` VARCHAR(255) NOT NULL,
    `category` VARCHAR(50) NOT NULL,
    `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `short_desc` TEXT,
    `description` TEXT,
    `rating` DECIMAL(3,2) NOT NULL DEFAULT 4.50,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. ORDERS TABLE
CREATE TABLE `orders` (
    `id` VARCHAR(50) PRIMARY KEY,
    `user_id` INT UNSIGNED DEFAULT NULL,
    `shipping_address` TEXT NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `payment_method` VARCHAR(50) NOT NULL DEFAULT 'UPI',
    `total_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `status` VARCHAR(30) NOT NULL DEFAULT 'Processing',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. ORDER ITEMS TABLE
CREATE TABLE `order_items` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `order_id` VARCHAR(50) NOT NULL,
    `product_id` VARCHAR(50) NOT NULL,
    `product_name` VARCHAR(200) NOT NULL,
    `quantity` INT NOT NULL DEFAULT 1,
    `unit_price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `total_price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    CONSTRAINT `fk_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- SAMPLE SEED PRODUCTS
INSERT INTO `products` (`id`, `product_name`, `img_url`, `category`, `price`, `short_desc`, `description`, `rating`) VALUES
('01', 'Stone and Beam Westview', '/static/media/arm-chair-01.jpg', 'sofa', 193.00, 'Premium living room arm chair', 'High quality crafted wooden frame with durable fabric upholstery.', 4.80),
('02', 'Riviere Arm Chair', '/static/media/arm-chair-02.jpg', 'sofa', 253.00, 'Modern accent arm chair', 'Ergonomic design with high-density foam seating.', 4.70),
('03', 'Balchecker Chair', '/static/media/arm-chair-03.jpg', 'sofa', 173.00, 'Contemporary lounge chair', 'Stylish minimal frame suitable for home or office lounge.', 4.60),
('08', 'Apple iPhone 13 Pro', '/static/media/phone-01.jpg', 'mobile', 899.00, 'Pro camera system flagship smartphone', 'Super Retina XDR display with ProMotion for faster response.', 4.90),
('09', 'Samsung Galaxy S22', '/static/media/phone-02.jpg', 'mobile', 749.00, 'Dynamic AMOLED smartphone', 'Nightography camera with long-lasting smart battery.', 4.80),
('16', 'Rolex Silver Vintage Watch', '/static/media/watch-01.jpg', 'watch', 299.00, 'Classic stainless steel wrist watch', 'Water resistant automatic movement luxury design.', 4.90),
('17', 'Timex Leather Quartz Watch', '/static/media/watch-02.jpg', 'watch', 120.00, 'Genuine leather analog watch', 'Durable mineral glass lens with indiglo backlight.', 4.50),
('22', 'Beat Studio Wireless Headphones', '/static/media/wireless-01.png', 'wireless', 199.00, 'Noise cancelling wireless headphones', 'Pure active noise cancelling with up to 22 hours listening time.', 4.80);