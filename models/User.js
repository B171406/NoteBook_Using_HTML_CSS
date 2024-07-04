// models/User.js
const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = '57db1a24a061ed03043ca809c61f788261d12c24bb42e27abb5f5643a7cf4f175da8e7893732aebf1fb637a3b5c35459abf0162391d2f12ced63d754be315e2c';

class User {
    static async register(name, email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await pool.query('INSERT INTO users (name, mail, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
            const accessToken = jwt.sign({ username: name }, JWT_SECRET);
            return { accessToken };
        } catch (error) {
            throw error;
        }
    }

    static async login(name, password) {
        console.log(name)
        console.log(password)
        try {
            const result = await pool.query('SELECT * FROM users WHERE name = ?', [name]);
            if (result.length === 0) {
                throw new Error('User not found');
            }
            const user = result[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const accessToken = jwt.sign({ username: user.name }, JWT_SECRET);
                return { accessToken };
            } else {
                throw new Error('Incorrect password');
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
