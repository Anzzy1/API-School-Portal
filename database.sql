CREATE DATABASE IF NOT EXISTS aguinaldo_portal;
USE aguinaldo_portal;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) DEFAULT '',
    last_name VARCHAR(50) NOT NULL,
    suffix VARCHAR(10) DEFAULT '',
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'operator') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE applicants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) DEFAULT '',
    last_name VARCHAR(50) NOT NULL,
    suffix VARCHAR(10) DEFAULT '',
    date_of_birth DATE,
    gender ENUM('Male', 'Female') DEFAULT 'Male',
    nationality VARCHAR(50) DEFAULT '',
    religion VARCHAR(50) DEFAULT '',
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) DEFAULT '',
    address VARCHAR(100) DEFAULT '',
    country VARCHAR(50) DEFAULT '',
    region VARCHAR(50) DEFAULT '',
    city VARCHAR(50) DEFAULT '',
    course_code VARCHAR(20) DEFAULT '',
    status ENUM('pending', 'enrolled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    description TEXT,
    tuition DECIMAL(10,2) DEFAULT 0,
    misc_fees DECIMAL(10,2) DEFAULT 0,
    duration VARCHAR(50) DEFAULT '4 years'
);

CREATE TABLE grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    grade DECIMAL(5,2) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    school_year VARCHAR(20) NOT NULL
);

CREATE TABLE subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject_code VARCHAR(20) UNIQUE NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    units INT NOT NULL,
    course_code VARCHAR(20)
);

CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'warning', 'success', 'error') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    day VARCHAR(20) NOT NULL,
    time_start VARCHAR(10) NOT NULL,
    time_end VARCHAR(10) NOT NULL,
    room VARCHAR(20) DEFAULT ''
);

CREATE TABLE newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Operator account
INSERT INTO users (student_id, first_name, last_name, email, password, role) VALUES
('OPE-0001', 'System', 'Administrator', 'admin@aguinaldo.edu.ph', 'admin123', 'operator');

-- Courses
INSERT INTO courses (course_code, course_name, department, description, tuition, misc_fees, duration) VALUES
('BSA', 'BS in Accountancy', 'Business Department', 'Focus on accounting principles, auditing, and taxation.', 40000.00, 10000.00, '4 years'),
('BSBA', 'BS in Business Administration', 'Business Department', 'Focus on management, marketing, and business operations.', 38000.00, 10000.00, '4 years'),
('BSCS', 'BS in Computer Science', 'IT Department', 'Focus on algorithms, programming languages, and computational theory.', 45000.00, 12000.00, '4 years'),
('BSIT', 'BS in Information Technology', 'IT Department', 'Focus on software development, networking, and database management.', 45000.00, 12000.00, '4 years'),
('BSIS', 'BS in Information Systems', 'IT Department', 'Focus on business systems analysis and IT solutions.', 43000.00, 12000.00, '4 years'),
('BELEMed', 'Bachelor of Elementary Education', 'Education Department', 'Focus on teaching methodologies for elementary education.', 35000.00, 9000.00, '4 years'),
('BSED', 'BS in Secondary Education', 'Education Department', 'Focus on teaching methodologies and curriculum development.', 35000.00, 9000.00, '4 years'),
('BSC', 'BS in Criminology', 'Criminology Department', 'Focus on criminal justice system and law enforcement.', 40000.00, 11000.00, '4 years'),
('BSHM', 'BS in Hospitality Management', 'HM Department', 'Focus on hotel and restaurant management, tourism.', 42000.00, 11000.00, '4 years'),
('BSTM', 'BS in Tourism Management', 'HM Department', 'Focus on travel, tourism planning, and destination management.', 40000.00, 11000.00, '4 years'),
('BSCpE', 'BS in Computer Engineering', 'Engineering Department', 'Focus on hardware, embedded systems, and computer architecture.', 45000.00, 13000.00, '5 years'),
('BPA', 'Bachelor in Public Administration', 'Business Department', 'Focus on governance, public policy, and administrative management.', 36000.00, 9000.00, '4 years');

INSERT INTO subjects (subject_code, subject_name, units, course_code) VALUES
('BSA101', 'Fundamentals of Accounting', 3, 'BSA'),
('BSA102', 'Auditing Theory', 3, 'BSA'),
('BA101', 'Principles of Management', 3, 'BSBA'),
('BA102', 'Marketing Management', 3, 'BSBA'),
('CS101', 'Discrete Mathematics', 3, 'BSCS'),
('CS102', 'Data Structures', 3, 'BSCS'),
('IT101', 'Introduction to Computing', 3, 'BSIT'),
('IT102', 'Programming Fundamentals', 3, 'BSIT'),
('IT103', 'Web Development', 3, 'BSIT'),
('IS101', 'Information Systems Fundamentals', 3, 'BSIS'),
('IS102', 'Database Management', 3, 'BSIS'),
('ELE101', 'Child Development', 3, 'BELEMed'),
('ELE102', 'Teaching Strategies', 3, 'BELEMed'),
('ED101', 'Foundations of Education', 3, 'BSED'),
('ED102', 'Curriculum Development', 3, 'BSED'),
('CRIM101', 'Introduction to Criminology', 3, 'BSC'),
('CRIM102', 'Criminal Law', 3, 'BSC'),
('HM101', 'Intro to Hospitality', 3, 'BSHM'),
('HM102', 'Food and Beverage Service', 3, 'BSHM'),
('TM101', 'Tourism Principles', 3, 'BSTM'),
('TM102', 'Destination Management', 3, 'BSTM'),
('CE101', 'Computer Engineering Fundamentals', 3, 'BSCpE'),
('CE102', 'Embedded Systems', 3, 'BSCpE'),
('PA101', 'Public Administration Theory', 3, 'BPA'),
('PA102', 'Public Policy', 3, 'BPA');
