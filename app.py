from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)

# Update this with your MongoDB URI and specify the database name 'something'
app.config["MONGO_URI"] = "mongodb://localhost:27017/something"
mongo = PyMongo(app)

@app.route('/submit', methods=['POST'])
def submit():
    answer = request.form['answer']  # 'Yes' or 'No'
    # Store the response in the 'sss' collection of the 'something' database
    responses = mongo.db.sss  # 'sss' is the collection name
    response_id = responses.insert_one({'answer': answer}).inserted_id
    print(f"Stored response with ID: {response_id}")
    return jsonify({"status": "success", "message": "Thank you for your response!"})

if __name__ == '__main__':
    app.run(debug=True)
