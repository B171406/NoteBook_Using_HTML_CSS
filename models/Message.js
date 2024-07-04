// models/Message.js
const pool = require('./db');

class Message {
    static async add(noteId, messageContent) {
        try {
            const result = await pool.query('INSERT INTO messages (note_id, message_content) VALUES (?, ?)', [noteId, messageContent]);
            return result.insertId; // Return the inserted message_id
        } catch (error) {
            throw error;
        }
    }

    static async getByNoteId(noteId) {
        try {
            const results = await pool.query('SELECT * FROM messages WHERE note_id = ?', [noteId]);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async delete(messageId) {
        try {
            const result = await pool.query('DELETE FROM messages WHERE message_id = ?', [messageId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Message;
