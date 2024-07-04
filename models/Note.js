// models/Note.js
const pool = require('./db');

class Note {
    static async add(noteName) {
        try {
            const result = await pool.query('INSERT INTO notes (note_title) VALUES (?)', [noteName]);
            return result.insertId; // Return the inserted note_id
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const notes = await pool.query('SELECT * FROM notes');
            return notes;
        } catch (error) {
            console.error('Error fetching notes:', error);
            throw error;
        }
    }

    static async delete(noteId) {
        try {
            const result = await pool.query('DELETE FROM notes WHERE note_id = ?', [noteId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Note;
