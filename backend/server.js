const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
require('dotenv').config();

const isRailway = process.env.PORT === '8080';

const dbConfig = {
    host: process.env.MYSQL_HOST || process.env.DB_HOST || (isRailway ? 'acela.proxy.rlwy.net' : 'localhost'),
    user: process.env.MYSQL_USER || process.env.DB_USER || (isRailway ? 'root' : 'root'),
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || (isRailway ? 'QHHVRVMEDcKHruZDcRfCIOrCXDPQOall' : ''),
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME || (isRailway ? 'railway' : 'aguinaldo_portal'),
    port: parseInt(process.env.MYSQL_PORT || process.env.DB_PORT || (isRailway ? '58438' : '3306'), 10)
};
const db = mysql.createConnection(dbConfig);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/images', express.static(path.join(__dirname, '..', 'images')));

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to MySQL database!');
    db.query("CREATE TABLE IF NOT EXISTS settings (setting_key VARCHAR(100) PRIMARY KEY, setting_value TEXT)");
    db.query("UPDATE applicants SET status='enrolled' WHERE status='pending'", (err) => {
        if (err) console.log('Migration note:', err.message);
    });
    db.query("ALTER TABLE applicants MODIFY COLUMN status ENUM('pending','enrolled','dropped') DEFAULT 'pending'", (err) => {
        if (err) console.log('Alter note:', err.message);
    });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No token provided.' });
    jwt.verify(token, process.env.JWT_SECRET || 'aguinaldo_secret', (err, user) => {
        if (err) return res.status(403).json({ success: false, message: 'Invalid token.' });
        req.user = user;
        next();
    });
}

function requireOperator(req, res, next) {
    if (req.user.role !== 'operator') {
        return res.status(403).json({ success: false, message: 'Operator access only.' });
    }
    next();
}

function generateStudentId(callback) {
    const year = new Date().getFullYear();
    const prefix = 'UA' + year;

    db.query("SELECT student_id FROM users WHERE student_id LIKE ? ORDER BY id DESC LIMIT 1", [prefix + '%'], (err, results) => {
        let nextNum = 1;
        if (results && results.length > 0) {
            const lastId = results[0].student_id;
            const lastNum = parseInt(lastId.slice(-5)) || 0;
            nextNum = lastNum + 1;
        }
        const studentId = prefix + String(nextNum).padStart(5, '0');
        callback(studentId);
    });
}

// ==================== LOGIN ====================
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required.' });
    }

    db.query('SELECT u.*, a.course_code AS app_course FROM users u LEFT JOIN applicants a ON u.student_id = a.student_id WHERE u.email = ?', [email], async (err, results) => {
        if (err) return res.json({ success: false, message: 'Database error.' });
        if (results.length === 0) {
            return res.json({ success: false, message: 'Invalid email or password.' });
        }

        const user = results[0];
        let valid = false;
        if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
            valid = await bcrypt.compare(password, user.password);
        } else {
            valid = (password === user.password);
        }

        if (!valid) {
            return res.json({ success: false, message: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { id: user.id, student_id: user.student_id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'aguinaldo_secret',
            { expiresIn: '24h' }
        );

        const fullName = [user.first_name, user.middle_name, user.last_name, user.suffix].filter(Boolean).join(' ');

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                student_id: user.student_id,
                full_name: fullName,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                course_code: user.app_course || ''
            }
        });
    });
});

// ==================== REGISTER (ENROLLMENT) ====================
app.post('/api/register', (req, res) => {
    const { first_name, middle_name, last_name, suffix, date_of_birth, gender, nationality, religion, email, phone, mother_name, mother_phone, father_name, father_phone, guardian_name, guardian_phone, barangay, address_line, country, region, city, course_code, year_level, password } = req.body;

    if (!first_name || !last_name || !email || !password || !course_code) {
        return res.json({ success: false, message: 'Required fields missing.' });
    }

    // Auto-generate student ID
    generateStudentId((student_id) => {
        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                // Insert into users table
                db.query(
                    'INSERT INTO users (student_id, first_name, middle_name, last_name, suffix, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [student_id, first_name, middle_name || '', last_name, suffix || '', email, hash, 'student'],
                    (err) => {
                        if (err) return res.json({ success: false, message: 'Registration failed. Email may already exist.' });

                        // Insert into applicants table
                        db.query(
                            'INSERT INTO applicants (student_id, first_name, middle_name, last_name, suffix, date_of_birth, gender, nationality, religion, email, phone, mother_name, mother_phone, father_name, father_phone, guardian_name, guardian_phone, address, barangay, country, region, city, course_code, year_level, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                            [student_id, first_name, middle_name || '', last_name, suffix || '', date_of_birth || null, gender || 'Male', nationality || '', religion || '', email, phone || '', mother_name || '', mother_phone || '', father_name || '', father_phone || '', guardian_name || '', guardian_phone || '', address_line || '', barangay || '', country || '', region || '', city || '', course_code, year_level || '1st Year', 'enrolled'],
                            (err2) => {
                                if (err2) console.log('Applicant insert warning:', err2.message);

                                // Generate sample schedule
                                const subjects = {
                                    'BSA': ['BSA101', 'BSA102'],
                                    'BSBA': ['BA101', 'BA102'],
                                    'BSCS': ['CS101', 'CS102'],
                                    'BSIT': ['IT101', 'IT102', 'IT103'],
                                    'BSIS': ['IS101', 'IS102'],
                                    'BELEMed': ['ELE101', 'ELE102'],
                                    'BSED': ['ED101', 'ED102'],
                                    'BSC': ['CRIM101', 'CRIM102'],
                                    'BSHM': ['HM101', 'HM102'],
                                    'BSTM': ['TM101', 'TM102'],
                                    'BSCpE': ['CE101', 'CE102'],
                                    'BPA': ['PA101', 'PA102']
                                };

                                const subjList = subjects[course_code] || [];
                                const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
                                const times = ['7:00-9:00', '9:00-11:00', '13:00-15:00', '15:00-17:00'];

                                subjList.forEach((subjCode, i) => {
                                    const day = days[i % days.length];
                                    const time = times[i % times.length];
                                    const [start, end] = time.split('-');
                                    db.query(
                                        'INSERT INTO schedules (student_id, subject, day, time_start, time_end, room) VALUES (?, ?, ?, ?, ?, ?)',
                                        [student_id, subjCode, day, start, end, 'B.' + (101 + i)]
                                    );
                                });

                                res.json({
                                    success: true,
                                    message: 'Registration successful!',
                                    student_id: student_id,
                                    full_name: [first_name, middle_name, last_name, suffix].filter(Boolean).join(' '),
                                    course_code: course_code
                                });
                            }
                        );
                    }
                );
            });
        });
    });
});

// ==================== SET PASSWORD ====================
app.post('/api/set-password', (req, res) => {
    const { student_id, password } = req.body;
    if (!student_id || !password || password.length < 6) {
        return res.json({ success: false, message: 'Invalid password.' });
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            db.query('UPDATE users SET password = ? WHERE student_id = ?', [hash, student_id], (err) => {
                if (err) return res.json({ success: false, message: 'Update failed.' });
                res.json({ success: true, message: 'Password set successfully.' });
            });
        });
    });
});

// ==================== COURSES ====================
app.get('/api/courses', (req, res) => {
    db.query('SELECT * FROM courses ORDER BY course_name ASC', (err, results) => {
        if (err) return res.json({ success: false, message: 'Query failed.' });
        res.json({ success: true, courses: results });
    });
});

// ==================== CONTACT ====================
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.json({ success: false, message: 'All fields are required.' });
    }
    db.query(
        'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [name, email, subject, message],
        (err) => {
            if (err) return res.json({ success: false, message: 'Failed to send message.' });
            res.json({ success: true, message: 'Message sent successfully!' });
        }
    );
});

// ==================== NEWSLETTER ====================
app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    if (!email) return res.json({ success: false, message: 'Email is required.' });
    db.query('INSERT INTO newsletter_subscribers (email) VALUES (?)', [email], (err) => {
        if (err && err.code === 'ER_DUP_ENTRY') {
            return res.json({ success: false, message: 'Already subscribed!' });
        }
        if (err) return res.json({ success: false, message: 'Subscription failed.' });
        res.json({ success: true, message: 'Subscribed successfully!' });
    });
});

// ==================== SITE STATS ====================
app.get('/api/stats', (req, res) => {
    const studentQuery = "SELECT COUNT(*) AS count FROM users WHERE role='student'";
    const programQuery = "SELECT COUNT(*) AS count FROM courses";
    db.query(studentQuery, (err, studentResult) => {
        if (err) return res.json({ success: false });
        const students = studentResult[0].count;
        db.query(programQuery, (err2, programResult) => {
            if (err2) return res.json({ success: false });
            const programs = programResult[0].count;
            res.json({ success: true, students, programs, faculty: 50 });
        });
    });
});

// ==================== PROFILE ====================
app.get('/api/profile', authenticateToken, (req, res) => {
    const sql = `
        SELECT u.*, a.date_of_birth, a.gender, a.nationality, a.religion,
               a.phone, a.mother_name, a.mother_phone, a.father_name, a.father_phone,
               a.guardian_name, a.guardian_phone, a.address, a.barangay, a.country, a.region, a.city, a.course_code AS app_course, a.status AS app_status
        FROM users u
        LEFT JOIN applicants a ON u.student_id = a.student_id
        WHERE u.id = ?
    `;
    db.query(sql, [req.user.id], (err, results) => {
        if (err || results.length === 0) {
            return res.json({ success: false, message: 'User not found.' });
        }
        const u = results[0];
        res.json({
            success: true,
            user: {
                student_id: u.student_id,
                first_name: u.first_name,
                middle_name: u.middle_name,
                last_name: u.last_name,
                suffix: u.suffix,
                full_name: [u.first_name, u.middle_name, u.last_name, u.suffix].filter(Boolean).join(' '),
                email: u.email,
                role: u.role,
                course_code: u.app_course || u.course || '',
                date_of_birth: u.date_of_birth || '',
                gender: u.gender || '',
                nationality: u.nationality || '',
                religion: u.religion || '',
                phone: u.phone || '',
                address: u.address || '',
                barangay: u.barangay || '',
                country: u.country || '',
                region: u.region || '',
                city: u.city || '',
                mother_name: u.mother_name || '',
                mother_phone: u.mother_phone || '',
                father_name: u.father_name || '',
                father_phone: u.father_phone || '',
                guardian_name: u.guardian_name || '',
                guardian_phone: u.guardian_phone || '',
                status: u.app_status || 'enrolled'
            }
        });
    });
});

app.put('/api/profile', authenticateToken, (req, res) => {
    const { phone, mother_name, mother_phone, father_name, father_phone, guardian_name, guardian_phone, country, region, city, barangay, address } = req.body;
    const sql = `UPDATE applicants SET phone=?, mother_name=?, mother_phone=?, father_name=?, father_phone=?, guardian_name=?, guardian_phone=?, country=?, region=?, city=?, barangay=?, address=? WHERE student_id=(SELECT student_id FROM users WHERE id=?)`;
    db.query(sql, [phone, mother_name, mother_phone, father_name, father_phone, guardian_name, guardian_phone, country, region, city, barangay, address, req.user.id], (err) => {
        if (err) return res.json({ success: false, message: 'Update failed.' });
        res.json({ success: true, message: 'Profile updated successfully.' });
    });
});

// ==================== GET STUDENT SCHEDULE ====================
app.get('/api/schedule/:student_id', authenticateToken, (req, res) => {
    db.query('SELECT * FROM schedules WHERE student_id = ? ORDER BY FIELD(day, "Monday","Tuesday","Wednesday","Thursday","Friday"), time_start ASC',
        [req.params.student_id],
        (err, results) => {
            if (err) return res.json({ success: false, message: 'Query failed.' });
            res.json({ success: true, schedule: results || [] });
        }
    );
});

// ==================== OPERATOR: SEARCH ====================
app.get('/api/operator/search', authenticateToken, requireOperator, (req, res) => {
    const type = req.query.type || 'all';
    const query = req.query.q || '';

    let sql = '';
    let params = [];

    if (type === 'id') {
        sql = "SELECT * FROM applicants WHERE student_id LIKE ?";
        params = ['%' + query + '%'];
    } else if (type === 'name') {
        sql = "SELECT * FROM applicants WHERE first_name LIKE ? OR last_name LIKE ? OR CONCAT(first_name, ' ', last_name) LIKE ?";
        params = ['%' + query + '%', '%' + query + '%', '%' + query + '%'];
    } else if (type === 'course') {
        sql = "SELECT * FROM applicants WHERE course_code LIKE ?";
        params = ['%' + query + '%'];
    } else {
        sql = "SELECT * FROM applicants WHERE student_id LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR course_code LIKE ?";
        params = ['%' + query + '%', '%' + query + '%', '%' + query + '%', '%' + query + '%'];
    }

    db.query(sql + " ORDER BY created_at DESC LIMIT 50", params, (err, results) => {
        if (err) return res.json({ success: false, message: 'Search failed.' });
        res.json({ success: true, students: results || [] });
    });
});

// ==================== OPERATOR: GET ALL STUDENTS ====================
app.get('/api/operator/students', authenticateToken, requireOperator, (req, res) => {
    db.query("SELECT * FROM applicants WHERE status != 'dropped' ORDER BY student_id ASC", (err, results) => {
        if (err) return res.json({ success: false, message: 'Query failed.' });
        res.json({ success: true, students: results || [] });
    });
});

// ==================== OPERATOR: ADD GRADE ====================
app.post('/api/operator/grades', authenticateToken, requireOperator, (req, res) => {
    const { student_id, subject, grade, semester, school_year } = req.body;
    if (!student_id || !subject || !grade || !semester || !school_year) {
        return res.json({ success: false, message: 'All fields required.' });
    }
    db.query(
        'INSERT INTO grades (student_id, subject, grade, semester, school_year) VALUES (?, ?, ?, ?, ?)',
        [student_id, subject, grade, semester, school_year],
        (err) => {
            if (err) return res.json({ success: false, message: 'Failed to add grade.' });
            res.json({ success: true, message: 'Grade added successfully!' });
        }
    );
});

// ==================== OPERATOR: GET GRADES ====================
// ==================== GET STUDENT GRADES (self) ====================
app.get('/api/my-grades', authenticateToken, (req, res) => {
    db.query('SELECT * FROM grades WHERE student_id = (SELECT student_id FROM users WHERE id = ?) ORDER BY school_year DESC, semester ASC',
        [req.user.id],
        (err, results) => {
            if (err) return res.json({ success: false, message: 'Query failed.' });
            res.json({ success: true, grades: results || [] });
        }
    );
});

// ==================== OPERATOR: GET GRADES ====================
app.get('/api/operator/grades/:student_id', authenticateToken, requireOperator, (req, res) => {
    db.query('SELECT * FROM grades WHERE student_id = ? ORDER BY school_year DESC, semester ASC',
        [req.params.student_id],
        (err, results) => {
            if (err) return res.json({ success: false, message: 'Query failed.' });
            res.json({ success: true, grades: results || [] });
        }
    );
});

// ==================== OPERATOR: UPDATE GRADE ====================
app.put('/api/operator/grades/:id', authenticateToken, requireOperator, (req, res) => {
    const { subject, grade, semester, school_year } = req.body;
    db.query(
        'UPDATE grades SET subject=?, grade=?, semester=?, school_year=? WHERE id=?',
        [subject, grade, semester, school_year, req.params.id],
        (err) => {
            if (err) return res.json({ success: false, message: 'Failed to update grade.' });
            res.json({ success: true, message: 'Grade updated successfully!' });
        }
    );
});

// ==================== OPERATOR: DELETE GRADE ====================
app.delete('/api/operator/grades/:id', authenticateToken, requireOperator, (req, res) => {
    db.query('DELETE FROM grades WHERE id=?', [req.params.id], (err) => {
        if (err) return res.json({ success: false, message: 'Failed to delete grade.' });
        res.json({ success: true, message: 'Grade deleted successfully!' });
    });
});

// ==================== OPERATOR: DROP STUDENT ====================
app.put('/api/operator/students/:student_id/drop', authenticateToken, requireOperator, (req, res) => {
    db.query('UPDATE applicants SET course_code=NULL, status=? WHERE student_id=?', ['dropped', req.params.student_id], (err) => {
        if (err) return res.json({ success: false, message: 'Failed to drop student.' });
        res.json({ success: true, message: 'Student dropped successfully!' });
    });
});

// ==================== OPERATOR: GET STUDENT INFO ====================
app.get('/api/operator/students/:student_id', authenticateToken, requireOperator, (req, res) => {
    const sql = `
        SELECT u.*, a.date_of_birth, a.gender, a.nationality, a.religion,
            a.phone, a.mother_name, a.mother_phone, a.father_name, a.father_phone,
            a.guardian_name, a.guardian_phone, a.address, a.barangay, a.country, a.region, a.city,
            a.course_code AS app_course, a.status AS app_status, a.year_level
        FROM users u
        LEFT JOIN applicants a ON u.student_id = a.student_id
        WHERE u.student_id = ?
    `;
    db.query(sql, [req.params.student_id], (err, results) => {
        if (err || results.length === 0) return res.json({ success: false, message: 'Student not found.' });
        const u = results[0];
        res.json({
            success: true,
            user: {
                student_id: u.student_id,
                first_name: u.first_name,
                middle_name: u.middle_name,
                last_name: u.last_name,
                suffix: u.suffix,
                full_name: [u.first_name, u.middle_name, u.last_name, u.suffix].filter(Boolean).join(' '),
                email: u.email,
                phone: u.phone || '',
                course_code: u.app_course || '',
                year_level: u.year_level || '1st Year',
                status: u.app_status || 'enrolled'
            }
        });
    });
});

// ==================== OPERATOR: UPDATE STUDENT INFO ====================
app.put('/api/operator/students/:student_id/update', authenticateToken, requireOperator, (req, res) => {
    const { first_name, middle_name, last_name, suffix, email, phone, year_level, status } = req.body;
    if (!first_name || !last_name || !email) return res.json({ success: false, message: 'First Name, Last Name, and Email are required.' });
    const sid = req.params.student_id;
    db.query('UPDATE applicants SET first_name=?, middle_name=?, last_name=?, suffix=?, phone=?, year_level=?, status=? WHERE student_id=?',
        [first_name, middle_name || '', last_name, suffix || '', phone || '', year_level || '1st Year', status || 'enrolled', sid], (err) => {
            if (err) return res.json({ success: false, message: 'Failed to update student info.' });
            db.query('UPDATE users SET email=?, first_name=?, middle_name=?, last_name=?, suffix=? WHERE student_id=?',
                [email, first_name, middle_name || '', last_name, suffix || '', sid], (err2) => {
                    if (err2) return res.json({ success: false, message: 'Failed to update user account.' });
                    res.json({ success: true, message: 'Student info updated successfully!' });
                });
        });
});

// ==================== C++ REPORT GENERATION ====================
app.post('/api/generate-report', authenticateToken, (req, res) => {
    const { student_id } = req.body;
    if (!student_id) {
        return res.json({ success: false, message: 'Student ID is required.' });
    }

    db.query('SELECT * FROM applicants WHERE student_id = ?', [student_id], (err, studentResults) => {
        if (err || !studentResults || studentResults.length === 0) {
            return res.json({ success: false, message: 'Student not found.' });
        }

        const student = studentResults[0];

        db.query('SELECT * FROM schedules WHERE student_id = ?', [student_id], (err2, schedResults) => {
            const schedules = schedResults || [];

            const cppPath = path.join(__dirname, '..', 'cpp-report', 'report_generator.exe');
            const reportsDir = path.join(__dirname, '..', 'public', 'reports');
            if (!fs.existsSync(reportsDir)) {
                fs.mkdirSync(reportsDir, { recursive: true });
            }

            if (!fs.existsSync(cppPath)) {
                return res.json({
                    success: true,
                    message: 'Report data ready (C++ not available).',
                    report_data: { student, schedules }
                });
            }

            const outputPath = path.join(reportsDir, student_id + '_report.pdf');
            const inputData = JSON.stringify({ student, schedules, outputPath });

            const child = spawn(cppPath, [inputData]);
            let resultData = '';

            child.stdout.on('data', (data) => { resultData += data.toString(); });
            child.stderr.on('data', (data) => { console.error('C++ Error:', data.toString()); });

            child.on('error', () => {
                res.json({
                    success: true,
                    message: 'Report data ready (C++ error).',
                    report_data: { student, schedules }
                });
            });

            child.on('close', (code) => {
                if (code === 0) {
                    res.json({
                        success: true,
                        message: 'Report generated!',
                        report_url: '/reports/' + student_id + '_report.pdf'
                    });
                } else {
                    res.json({
                        success: true,
                        message: 'Report data ready (C++ not available).',
                        report_data: { student, schedules }
                    });
                }
            });

            child.on('error', () => {
                res.json({
                    success: true,
                    message: 'Report data ready.',
                    report_data: { student, schedules }
                });
            });
        });
    });
});

// ==================== NOTIFICATIONS ====================
app.get('/api/notifications/:user_id', authenticateToken, (req, res) => {
    db.query('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 20',
        [req.params.user_id],
        (err, results) => {
            if (err) return res.json({ success: false, message: 'Query failed.' });
            res.json({ success: true, notifications: results || [] });
        }
    );
});

// ==================== STATIC FILES ====================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ==================== GET TUITION FEES ====================
const feeData = {
    'BSA': { tuition: 20000, comlab: 2500, portal: 500, mailing: 300, lms: 1000, other: 800 },
    'BSBA': { tuition: 18500, comlab: 2000, portal: 500, mailing: 300, lms: 1000, other: 800 },
    'BSCS': { tuition: 22000, comlab: 3000, portal: 500, mailing: 300, lms: 1000, other: 800 },
    'BSIT': { tuition: 22000, comlab: 3000, portal: 500, mailing: 300, lms: 1000, other: 800 },
    'BSIS': { tuition: 21000, comlab: 2500, portal: 500, mailing: 300, lms: 1000, other: 800 },
    'BELEMed': { tuition: 18000, comlab: 2000, portal: 500, mailing: 300, lms: 1000, other: 800 },
    'BSED': { tuition: 18000, comlab: 2000, portal: 500, mailing: 300, lms: 1000, other: 800 },
    'BSC': { tuition: 20000, comlab: 2500, portal: 500, mailing: 300, lms: 1000, other: 800 },
    'BSHM': { tuition: 21000, comlab: 2500, portal: 500, mailing: 300, lms: 1000, other: 800 },
    'BSTM': { tuition: 20000, comlab: 2500, portal: 500, mailing: 300, lms: 1000, other: 800 },
    'BSCpE': { tuition: 23000, comlab: 3000, portal: 500, mailing: 300, lms: 1000, other: 800 },
    'BPA': { tuition: 18500, comlab: 2000, portal: 500, mailing: 300, lms: 1000, other: 800 }
};
app.get('/api/fees/:course_code', (req, res) => {
    const fees = feeData[req.params.course_code] || feeData['BSIT'];
    res.json({ success: true, fees });
});

// ==================== AI CHAT ====================
app.get('/api/save-key', (req, res) => {
    const key = req.query.key;
    if (!key) return res.send('Usage: /api/save-key?key=YOUR_API_KEY');
    db.query("INSERT INTO settings (setting_key, setting_value) VALUES ('openrouter_key', ?) ON DUPLICATE KEY UPDATE setting_value=?", [key.trim(), key.trim()], (err) => {
        if (err) return res.send('Database error: ' + err.message);
        res.send('API key saved to database! The chat should work now.');
    });
});

app.get('/api/debug-env', (req, res) => {
    const keys = Object.keys(process.env).filter(k => !k.toLowerCase().includes('pass') && !k.toLowerCase().includes('key') && !k.toLowerCase().includes('secret') && !k.toLowerCase().includes('token'));
    const allKeys = Object.keys(process.env).sort();
    res.json({ PORT: process.env.PORT, NODE_ENV: process.env.NODE_ENV, allKeys, count: allKeys.length });
});

app.post('/api/chat', (req, res) => {
    try {
        const { message, history } = req.body;
        if (!message) return res.json({ success: false, reply: 'Please enter a message.' });

        let apiKey = (process.env.OPENROUTER_KEY || '').trim();
        if (!apiKey) {
            try { apiKey = fs.readFileSync(path.join(__dirname, 'gemini.key'), 'utf8').trim(); } catch(e) {}
        }
        if (!apiKey) {
            // Try database
            db.query("SELECT setting_value FROM settings WHERE setting_key='openrouter_key'", (err, rows) => {
                if (!err && rows && rows.length > 0 && rows[0].setting_value) {
                    processChat(req, res, rows[0].setting_value, message, history);
                } else {
                    return res.json({ success: false, reply: 'No API key set. Visit /api/save-key?key=YOUR_KEY' });
                }
            });
            return;
        }
        processChat(req, res, apiKey, message, history);
    } catch (e) {
        console.error('Chat error:', e.message);
        res.status(500).json({ success: false, reply: 'Server error: ' + e.message });
    }
});

function processChat(req, res, apiKey, message, history) {
    const https = require('https');
    const messages = [{ role: 'system', content: 'You are a helpful assistant for Aguinaldo Polytechnic Institute. Answer about enrollment, programs, tuition, schedules. Be concise.' }];
    if (history && Array.isArray(history)) {
        history.forEach(h => messages.push({ role: h.role, content: h.text }));
    }
    messages.push({ role: 'user', content: message });

    const postData = JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages,
        max_tokens: 500
    });

    const options = {
        hostname: 'openrouter.ai',
        path: '/api/v1/chat/completions',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        }
    };

    const reqAI = https.request(options, (aiRes) => {
        let data = '';
        aiRes.on('data', chunk => data += chunk);
        aiRes.on('end', () => {
            try {
                const parsed = JSON.parse(data);
                if (parsed.error) console.error('OpenRouter error:', JSON.stringify(parsed.error));
                const reply = parsed.choices?.[0]?.message?.content || parsed.error?.message || 'No response.';
                res.json({ success: true, reply });
            } catch (e) {
                res.json({ success: false, reply: 'Parse error: ' + e.message });
            }
        });
    });

    reqAI.on('error', (e) => {
        console.error('AI error:', e.message);
        res.json({ success: false, reply: 'AI unavailable (' + e.message + ')' });
    });
    reqAI.write(postData);
    reqAI.end();
}

// ==================== START SERVER ====================
app.listen(PORT, () => {
    console.log('============================================');
    console.log('  AGUINALDO POLYTECHNIC INSTITUTE');
    console.log('  Server is running!');
    console.log('============================================');
    console.log('  Frontend: http://localhost:' + PORT);
    console.log('  API:      http://localhost:' + PORT + '/api');
    console.log('============================================');
    const cppExe = path.join(__dirname, '..', 'cpp-report', 'report_generator.exe');
    console.log('  C++ Service: ' + (fs.existsSync(cppExe) ? 'Ready' : 'Not compiled'));
    console.log('============================================');
});
