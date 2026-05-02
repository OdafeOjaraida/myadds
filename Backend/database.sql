CREATE DATABASE IF NOT EXISTS hams_db;
USE hams_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('student', 'laundry_staff', 'meal_staff', 'admin') NOT NULL,
    student_id VARCHAR(20) UNIQUE, 
    face_image_url VARCHAR(255), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    meal_plan_status ENUM('Active', 'Inactive', 'Suspended') DEFAULT 'Inactive',
    laundry_items_used INT DEFAULT 0,
    laundry_items_total INT DEFAULT 30,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    staff_id INT NOT NULL,
    service_type ENUM('Meal', 'Laundry') NOT NULL,
    status ENUM('Approved', 'Rejected') NOT NULL,
    items_deducted INT DEFAULT 0, 
    transaction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (staff_id) REFERENCES users(id)
);

-- Inserting mock data for your presentation
INSERT INTO users (name, email, role, student_id, face_image_url) VALUES 
('Starr Johnson', 'student@hams.com', 'student', 'STU001', 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg'),
('Musa', 'laundry@hams.com', 'laundry_staff', NULL, NULL),
('Blessing', 'meal@hams.com', 'meal_staff', NULL, NULL),
('Odafe', 'admin@hams.com', 'admin', NULL, NULL);

INSERT INTO student_subscriptions (user_id, meal_plan_status, laundry_items_used, laundry_items_total) VALUES 
(1, 'Active', 12, 30);

CREATE DATABASE IF NOT EXISTS hams_db;
USE hams_db;

-

-- 3. Laundry Transaction Logs (Security & Fraud Prevention)
CREATE TABLE laundry_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    staff_id INT NOT NULL,
    items_deducted INT NOT NULL,
    transaction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (staff_id) REFERENCES users(id)
);

-- 4. Meal Transaction Logs (Security & Fraud Prevention)
CREATE TABLE meal_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    staff_id INT NOT NULL,
    meal_type ENUM('Breakfast', 'Dinner') NOT NULL,
    transaction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (staff_id) REFERENCES users(id)
);