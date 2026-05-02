from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app) # This lets your React app talk to this server

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root123", 
    "database": "hams_db"
}

@app.route('/api/student/<student_id>', methods=['GET'])
def get_student(student_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM users WHERE student_id = %s"
        cursor.execute(query, (student_id,))
        student = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if student:
            return jsonify(student), 200
        return jsonify({"error": "Student not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)