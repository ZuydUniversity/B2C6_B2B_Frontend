from flask import Flask, request, jsonify
from pymysql import MySQLError
import pymysql.cursors

app = Flask(__name__)

# MySQL connection
db = pymysql.connect(host='localhost',
                     user='root',
                     password='Benjamin1803!',
                     database='notes_db',
                     cursorclass=pymysql.cursors.DictCursor)

mysql = MySQLError(app)

# API route to fetch all notes
@app.route('/fetch-notes', methods=['GET'])
def fetch_notes():
    try:
        with db.cursor() as cursor:
            query = 'SELECT id, data AS description, created_at AS date FROM notes'
            cursor.execute(query)
            results = cursor.fetchall()
            return jsonify({'notes': results}), 200
    except Exception as e:
        print('Error fetching notes:', e)
        return jsonify({'error': 'Failed to fetch notes'}), 500

# API route to add a note
@app.route('/add-note', methods=['POST'])
def add_note():
    try:
        description = request.json.get('description')
        if not description:
            return jsonify({'error': 'Note description is required'}), 400
        with db.cursor() as cursor:
            query = 'INSERT INTO notes (data) VALUES (%s)'
            cursor.execute(query, (description,))
            db.commit()
            new_note_id = cursor.lastrowid
            return jsonify({'id': new_note_id, 'description': description, 'date': str(new_note_id)}), 201
    except Exception as e:
        print('Error saving note:', e)
        return jsonify({'error': 'Failed to save note'}), 500

# API route to delete a note
@app.route('/delete-note/<int:id>', methods=['DELETE'])
def delete_note(id):
    try:
        with db.cursor() as cursor:
            query = 'DELETE FROM notes WHERE id = %s'
            cursor.execute(query, (id,))
            db.commit()
            return jsonify({'message': 'Note deleted successfully'}), 200
    except Exception as e:
        print('Error deleting note:', e)
        return jsonify({'error': 'Failed to delete note'}), 500

if __name__ == '__main__':
    app.run(port=5000)
